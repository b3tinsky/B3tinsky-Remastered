---
title: "Signing Git Commits"
date: "2022-08-24"
tags: ["CS"]
---

### Preface
Before we start, make sure to already have a GPG key. If you don't have one, check out [this post](gpgkeypair).

### Adding key to Github
In your Github settings, look for the __SSH and GPG keys__ in the Access section.
![SSH and GPG keys](./Screenshot_1.png)

Then add a title for the GPG we already created.

![Add new GPG key](./Screenshot_2.png)

An important thing to mention, is that Github only lets you import keys that match your account email, so be careful when creating your keys.

### Telling Git about your GPG key
First we need to get our secret key and give it Git through our global config file. To do that, we first need to see the private key with the following command:
```console
gpg --list-secret-keys --keyid-format=long
```
From the output (remember, this is considering you already created a GPG key and its still valid), copy the __sec__ portion of the key, after the slash:
```output
gpg --list-secret-keys --keyid-format=long
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot 
ssb   4096R/42B317FD4BA89E7A 2016-03-10
```
In this case, the key would be __3AA5C34371567BD2__.

Now we have to set it as our global Git signing key with the following command:
```console
git config --global user.signingkey 3AA5C34371567BD2
```
And finally, depending on which terminal you use, you have to add the GPG key to the startup file. In my case, I will add it to bash with the following command:
```console
[ -f ~/.bashrc ] && echo 'export GPG_TTY=$(tty)' >> ~/.bashrc
```
If you use something like ZSH, you could do it by adding the following line to the __.zshrc__ file:
```output
# Allows your gpg passphrase prompt to spawn (useful for signing commits).
export GPG_TTY="$(tty)"
```

### Reference
📺 [Signing and Verifying Git Commits on the Command Line and GitHub](https://youtu.be/4166ExAnxmo)

📰 [Telling Git about GPG & SSH keys](https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key)