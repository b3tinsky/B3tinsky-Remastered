---
title: "Signing Git Commits"
date: "2022-08-24"
tags: ["CS"]
---

### Preface
Before we start, make sure to already have a GPG key. If you don't have one, check out [this post](www.b3tinsky.dev/blog/gpgkeypair).

### Adding key to Github
In your Github settings, look for the __SSH and GPG keys__ in the Access section.
![SSH and GPG keys](./Screenshot_1.png)

Then add a title for the GPG we already created.

![Add new GPG key](./Screenshot_2.png)

An important thing to mention, is that Github only lets you import keys that match your account email, so be careful when creating your keys.

### Signing commits
Before doing a commit or anything else, we must first create a user config file in your repository with the following values:
```output
[user]
    name = <Your name>
    email = <Your email>
    signingkey = <Your key email>

[commit]
    gpgsign = true

[tag]
    gpgsign = true
```

When doing a commit, you must add the __-S flag__, like this:
```console
git commit -S -m "Commit message"
```

### Reference
📺 [Signing and Verifying Git Commits on the Command Line and GitHub](https://youtu.be/4166ExAnxmo)
