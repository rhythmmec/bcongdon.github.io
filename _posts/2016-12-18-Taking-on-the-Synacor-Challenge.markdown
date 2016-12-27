---
layout:     post
title:      Taking on the Synacor Challenge
date:       2016-12-18 07:51:30
tags:       python puzzles coding
image:		  https://c2.staticflickr.com/6/5615/31772061931_b93d21ac8e_k.jpg
---

I've been really enjoying this year's [AdventOfCode](http://adventofcode.com/2016), a set of daily puzzles by [Eric Wastl](https://twitter.com/ericwastl). I had some free time around finals week, so I decided to take the plunge into another one of Eric's puzzles, the [Synacor Challenge](https://challenge.synacor.com/). It was, without exaggeration, the best and most engaging puzzle I've ever encountered.<!--break-->

If you haven't attempted this puzzle and you're the type of person that likes intricate programming puzzles, you owe it to yourself to give this a try. The [spoiler free] premise of the puzzle is this: You're given a binary file and a description of an machine architecture that can run the binary file. The initial challenge is to write a VM that executes the binary.

I shied away from this puzzle last year because the initial challenge seemed too daunting. However, after taking a Computer Architecture course this semester, the path to implementation was a *lot* clearer now.

That's likely all I can say without spoiling any of the puzzles, so I'd really encourage you to stop reading now if you haven't done the challenge.

## ~~~ Spoiler Warning ~~~

### 1. The Virtual Machine
I decided to write my VM in Python, because of my familiarity with the language. I knew that there'd be significant overhead and that the resulting 'machine' would be slow. I expected that I'd have to reimplement the VM later in something like C++, but to my delight, the Python implementation was plenty fast.

I went through several design patterns for the VM, and ended up settling on an imperfect Object Oriented design. Initially, I wanted everything to be as stateless as possible, using a Pythonic file-as-a-module design pattern, but this broke down pretty quickly. It resulted in functions like:

```python
def op_jump(instructions, data_memory):
	#foo
def op_add(instructions, data_memory):
	#bar
```

This isn't _terrible_, but it meant that my `instruction` object had to hold the state of the PC. I wanted operations to have as few side-effects as possible.

So, my final solution had two objects - which *could* be combined into one: the `VirtualMachine`, which holds the PC, registers, and memory, and the `OperatorUnit`, which delegates instructions to their respective functions.

I'm pretty happy with the `OperatorUnit`'s use of [reflection](https://en.wikipedia.org/wiki/Reflection_(computer_programming));it determines the number of arguments an instruction needs and pulls that exact number of bytes from the instruction memory. It still necessitates operations to have a reference to the VM, but it made disassembling the bytecode later a bit more clean.

Setting up the arithmetic operations was straight forward. I had a few hiccups getting the data memory hooked up, as I assumed that the instructions and data should be held in different memory spaces. However, it seams like the included binary has a significant amount of included data, so I had to join the two spaces together, resulting in a single data space for both instructions and memory.

Additionally, I had a bit of confusion on memory addressing. I wasn't sure if the memory was supposed to be byte addressed, or word addressed.

**Correct:**

```
Addr|0x00000000|0x00000001|0x00000002
Data|0xdeadbeef|0x0cafedad|0x0d06f00d
```
vs.

**Incorrect:**

```
Addr|0x00000000|0x00000001|0x00000002|0x00000003
Data|    0xdead|    0xbeef|    0x0caf|    0xedad
```
To be fair, the architecture is quite clear: 

>"address 0 is the first 16-bit value, address 1 is the second 16-bit value"

... but in the midst of figuring out that data and instruction memories should be unified, I got confused.

The other slight hiccup I had was in text input. The instruction set is a bit vague as to how you're to support multi-character inputs. I assumed that on an `in <a>` instruction, you would write the entire line line to the address space starting at `<a>`, but this is not the case. Instead, you need to keep an input buffer of the entire line, and on each `in <a>` command, write the oldest character in the buffer to `<a>`. This was a bit of a head scratcher, and a place where I think the documentation could be improved (although perhaps this was intentionally vague).

### 2. The Text Adventure Game

Once I got my VM to pass it's self-tests I found that, to my surprise, it booted up a text-adventure game. I'd just spent hours working on the VM, so I took a bit of a break before coming back and solving the ensueing puzzles.

The first real puzzle was to find the can of lantern oil somewhere in the caverns. I tried mapping out the cave space, but I don't think the space formed a coherent grid. It took me a few trials of being eaten by the grue to realize that walking around in the dark is dangerous, and that the bioluminescent cave held more promise.

Eventually, I got lucky and stumbled upon the can in the cave, and saved my path for later replays. (My solution was `west->south->north`, but YMMV)

It was at this point that I threw together a walkthrough script to automatically get through the first parts of the text adventure. I took a hint from [fwenzel](https://github.com/fwenzel/synacor-challenge/blob/master/vm/solution.sh) and used `expect` to automate the walkthrough.

After looking at others' solutions, the approach taken by most people to make checkpoints was to dump the current state of the machine at the checkpoint, and reinitialize from there. This is a more elegant solution than the walkthrough script, but I like the added "constraint" of having an immutable binary blob. 

### 3. The Coin Puzzle

The coin puzzle had a good payoff and was probably the quickest puzzle of all to solve. Essentially, you collect a set of coins, which you can inspect to see their value, and have to place them in a specific order to satisfy the puzzle input. The puzzle, engraved on the wall, is:

`_ + _ * _^2 + _^2 - _ = 399`

I threw together a simple `itertools.permutations` iterator, along with a solution checker, and got a [solution](https://github.com/bcongdon/synacor_challenge/blob/master/coin_solver.py) in under 1 second. It helped that the problem space is pretty small.

Of course, `9 + 2*5^2 + 7^3 - 3 = 399`, so I put the coins in order `blue->red->shiny->concave->corroded` and moved on.

### 4. The Teleporter
The teleporter was, without doubt, the most sinister, clever puzzle of the whole challenge.

I realized early on that I'd have to do some looking at the source bytecode. Fortunately, I'd written my VM in a way that made it fairly straightforward to decompile the machine code into instructions. Decompilation was essentially just an exercise in string formatting.

The puzzle dictates that something clever is happening with the 8th register, so I dove into the source and found pretty quickly that the 8th register was only referenced a handful of times.

I was able to quickly hack the register to be non-zero when the teleport check occurs by monkey-patching my input function with a custom operation. This allowed the teleporter to function, however the code that was generated after the teleport was invalid. Apparently, the value set to register 8 contributed to the code generation. I could have continued with the game, but the completionist in me wanted to solve the puzzle the *correct way*.

I went back and looked at the disassembled binary, but didn't immediately see what was happening. I decided to extend my VM to dump a stream of the instructions it performed. This runtime-instruction list wasn't super useful, but it did give me a better picture of where the "hot code" was located in the binary file.

After a bit of sleuthing and, I'll be honest, a peek at others' solutions, I realized that the code was doing a modified version of the Ackermann function. (Recognized it pretty quickly from a [Computerphile](https://www.youtube.com/watch?v=i7sm9dzFtEI) video I'd seen in the past)

I tried a bunch of Python implementations to calculate the "correct" register value. Recursion failed pretty quickly because of Python's tepid stack frame limit. Memoization didn't help either. I tried a memoized C++ approach and still was unsuccessful. It was only when I found an optimized C++ approach (which made some assumptions about the results of 'common' Ackermann inputs) that I was able to get a result. There were still a couple of tricks with modulo arithmetic, but once I had these optimizations, I found my correct register value almost immediately.

I really have to commend this stage of the puzzle. It was doable, but a real head scratcher for a very long time. Also, the method by which you solved the puzzle - disassembling the binary and then hot wiring the runtime register configuration - was super enthralling.

### 5. The Orb Maze
Getting from the teleport destination (the beach) to the Orb maze was pretty straight forward. Once I got to the Orb maze, I took some pen and paper and wrote down the configuration of the maze:

```
*	8	-	1
4	*	11	*
+	4	-	18
22	-	9	*
```

It seemed pretty clear from the text that each time you moved from one tile to another, you were constructing an arithmetic expression - evaluated in order - that needed to match the value on the vault door: `30`.

I threw together a quick breadth-first search script in Python which found the shortest path that ended in the upper-right corner with a path that evaluated to 30. The resulting cardinal direction path was `N E E N W S E E W N N E`, which corresponds to `22 + 4 - 11 * 4 - 18 - 11 - 1 = 30`.

This was the correct, shortest path, and allowed me to open the vault door, revealing the final code.

### Conclusion

This was an amazing puzzle. I completed it over the course of a few days; I couldn't get it out of my mind. I'm not a person that likes insurmountable puzzles, or doing puzzles for the sake of puzzles.

I think the genius of the Synacor challenge is that it veils the necessary puzzle-ness of the challenge in practical, applied computer science with a healthy dose of text adventure added in, for good measure.

I've come back to my solution a couple times and always have the thought "Wow, that was a wild ride". I'll be recommending this to others for years to come.

*Cover:* [Flickr](https://www.flickr.com/photos/cc0/31772061931/in/pool-publicdomain/)