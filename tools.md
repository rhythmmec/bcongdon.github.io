---
layout: page
title: Tools
---

# Tools I Use and Love

These are the tools that I use everyday to write code and do fun stuff on the internet. This is not necessarily an endorsement of these tools, but this is what works well for me.

Note: None of the links on this page are affiliate links.

*Last Updated:* June 1, 2017

### Development
* **[Sublime Text 3](https://www.sublimetext.com/)** - Sublime Text is my editor of choice. It's fast, has good package support, and it runs everywhere I need it (except ssh).
    * **[sublime-boxy](https://github.com/ihodev/sublime-boxy)** - Sublime-Boxy (specifically [Boxy Solarized Dark](https://github.com/ihodev/sublime-boxy/wiki/Get-It#boxy-solarized-dark)) is my favorite Sublime theme. It's minimalist, well styled, and a great improvement over the out-of-the-box interface design. I especially prefer it to other Solarized Dark themes because it does a nice job of theming the sidebar.
    * **[GitGutter](https://github.com/jisaacks/GitGutter)** - GitGutter is great for working on larger code bases. You can see immediately what you've added, changed, and deleted. Cuts down on needing to context-switch to look at git to find out what changes you've made to a file.
    * **[SublimeLinter](http://www.sublimelinter.com/en/latest/)** - IMO, linters are great. SublimeLinter does what you'd expect. I'm passionate about code aesthetics, and in-editor linting is a great way to promote the practice of writing beautiful code.
        * **[SublimeLinter-pep8](https://github.com/SublimeLinter/SublimeLinter-pep8)** Running Sublime Linter with pep8 made my Python code become infinitely more idiomatic. Full stop. Having a in-editor linter gave me the little nudge I needed to write more thoughtful, elegant Python.
* **[SourceTree](https://www.sourcetreeapp.com/)** - This is a bit controversial, but I like having a GUI client for git. Not for everything (most in-depth git operations will still require dropping down into the CLI), but SourceTree allows me to minimize the number of common git mistakes that get made. Seeing graphically staged changes is a big deal for me, and SourceTree allows you to stage specific lines of a file much easier than the git CLI.

#### Web Development
* **[Postman](https://www.getpostman.com/)** - Unlike my other tools, this isn't one that I *love*. I'm not sure why, but I think I'm not in love with the way the interface is laid out. I'm not a heavy enough user to take advantage of all the custom environment and saved request options... Postman is a decent tool for testing APIs, but it's not amazing. However, I haven't yet found anything better.
* **[Sizzy](http://sizzy.co/)** - In the small amount of front-end development that I do, Sizzy allows me to preview my layouts on varying screen sizes. Sizzy, unlike other similar sites, supports viewing websites served on `localhost`, which is an essential feature for web development.


### Terminals
* **[iTerm2](https://www.iterm2.com/)** - Much more customizable than Terminal.app. Has better theming support, 
    * **[Source Code Pro Light](https://github.com/adobe-fonts/source-code-pro) Font** - Super readable, and I like the aesthetic.
* **[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)** - I'm not a hardcore ZSH fan, but `oh-my-zsh` is really awesome. This shell gives you tons of productivity wins: git status in the prompt, super great auto-completion and history searching. Seriously, it's worth a try. I was skeptical of leaving bash, but it's really been worth the switch.
    * **[agnoster](https://github.com/robbyrussell/oh-my-zsh/wiki/themes#agnoster) theme** - Agnoster is a great theme for zsh. I've been told it's a 'newb' theme by a more experienced user of zsh, but I really like it. It's a bit flashy, but that's what makes it fun.

### Databases
* [Sequel Pro](https://www.sequelpro.com/) - Sequel Pro is a great GUI interface for MySQL. It allows you to create and modify tables, query tables, edit and create rows, everything you'd need to bootstrap a database setup. Two thumbs up. 👍👍
* [Postico](https://eggerapps.at/postico/) - Postico is pretty much at feature-parity with Sequal Pro, but for PostgreSQL.

### Utilities
* [grip](https://github.com/joeyespo/grip) - Grip allows you to preview Github markdown really easily. It's a simple command line tool, works reliably, and speeds up the process of writing Github READMEs.
* [autoenv](https://github.com/kennethreitz/autoenv) - Autoenv is a great way to manage project environments. I find it especially useful for managing Python environments (see this post), but it's a great way to manage any type of project-specific environment configuration. Autoenv let's you setup an environment once, and lets you never have to thing about it again.
* [mojibar](https://github.com/muan/mojibar) - I use this all the time. Mojibar lets you search for emojis with a keystroke. An essential tool for communicating pictographically in the modern internet. 😝
* [f.lux](https://justgetflux.com/) - Eye strain can be a real headache. I've found that "screen-yellowing" after sunset cuts down on the worst of eye strain. I don't use f.lux so much anymore - I've found that Night Shift is just as good, and is supported natively on macOS. I still do use f.lux on Linux.
