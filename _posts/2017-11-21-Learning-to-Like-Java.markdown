---
layout:     post
title:      Learning to Like Java
date:       2017-11-21 10:56:02
tags:       java coding web
---

[This summer](http://benjamincongdon.me/blog/2017/09/04/Internship-2017-Zillow/), I worked primarily in Java on a backend service for Zillow's advertising platform. This service was built on top of [Spring Boot](https://projects.spring.io/spring-boot/), an "opinionated" Java web framework. <!--break-->

Going into this project, I have to admit that I wasn't thrilled about using Java. I'm most comfortable doing development with my text editor (Sublime Text), and a terminal window. Writing Java code pretty much necessitated that I switch to IntelliJ.

Needless to say, I spent the first few weeks on the project fighting with Java and the Spring framework. Idiomatic Spring code requires dependency injection all throughout your code base, with XML black magic to "wire" together all the pieces of your app. This often ends up in pretty indecipherable code -- at least initially.

After the first few weeks, I did come to appreciate Java as a language. In fact, I have almost no complaints about the language *itself* (aside from a few typing quirks), but I'm still not in love with Spring.

### Magic Spring Beans

A common pattern is to have a service consume a client object by having the client "Autowired" into the service at runtime.

```java
@Service
public class MyService {
	...
	@Autowired
	private OtherServiceClient otherServiceClient;
	...
}
```
And then, you typically configure this client in XML.

```xml
<bean id = "otherServiceClient" class = "OtherServiceClient">
	... other configuration ...
</bean>
```

`@Autowired` scans your application's configuration for 'beans' that match the requested object, and then instantiate/inject that object when Spring starts up.

Even once you get past the point of this feeling like [magic wizard code](https://pragprog.com/the-pragmatic-programmer/extracts/wizards), I'm still unconvinced that this is a good model for configuring applications.

To an unexperienced Java dev, it's quite difficult to track down where things are configured. I found that codebases that follow this model also have baked-in implicit assumptions about how Spring autowires components.

### Java Types

Somewhat surprisingly, I did come to enjoy working within the Java type system. The type system holds your hands in a lot of ways that dynamic languages like Python and Ruby cannot. I'm not the biggest fan of OO design, but when it's an appropriate fit for a project, it provides a really nice abstraction framework.

Furthermore, working in an IDE that is aware of the type system is also quite nice. The Java compiler "keeps you honest" about the function contracts that you specify. Pythonic interface designs often have implicit function contracts, but they're not *really* enforced which can lead to some hacky results.

### Async Java

Another interesting characteristic about the service that I was working on was that we designed it to be entirely asynchronous. All requests were handled asynchronously, and all service calls were also aysnc.

It seems like this used to be somewhat of a nightmare to do in Java. However, Java 8 has a decent amount of syntactic sugar that makes working in Async actually rather nice.

In my opinion, the best current API for async in Java is [CompletableFuture](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html). A CompletableFuture is, well, a future that can be *completed*. The powerful thing about them is that they can be chained together:

```java
CompletableFuture<Integer> provider = new CompletableFuture();
CompletableFuture <Integer> consumer = provider.thenApply(
	(providedResult) -> { return 10 * providedResult; }
);
provider.complete(123);
consumer.get(); // 1230
```

This can be paired with Java 8's [Lambdas](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html), which are a great improvement over previous APIs. Previous Java versions required to you create anonymous Runnable objects to exploit this functionality, but now Lambdas seem to be the cleaner choice.

The `CompletableFuture` API has a ton of great primitives for synchronizing and combining asynchronous calls. It's fairly painless to do exception handling within this framework -- though there is a quirk in that you can only throw `RuntimeException`s inside a `CompletableFuture` stage.

Funnily enough, chaining a bunch of `CompletableFuture`s together can result in code that *looks* like Javascript in that you have a bunch of nested callbacks. [Callback hell](http://callbackhell.com/) in Java, anyone?

(In all seriousness, you can usually get around "callback hell"-style-code by messing with the way you define your callback stages)

### Conclusion

Will I be using Java in side projects anytime soon? Probably not. There are other, more fun, languages that I'd try out first.

However, I now respect Java's place in the development world a lot more than I used to. (*Eww... Java*) It shines in environments when there are a lot of people working on a single codebase, and provides some nice classes of guarantees that you don't get in dynamic languages.

Is Java fun and exciting? Nope, but it does seem like a good workhorse language. Java 8 made some substantial improvements, and I wouldn't mind working in it again.