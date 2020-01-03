# Applied cryptography – assignment 1, block ciphers and chaining modes

## October 17, 2019

## 1 Instructions

Solve the problem described below in a programming language of your choice. The assignment
should be solved individually. A complete solution will be rewarded with 20 points. A partial
solution will be awarded with less. The primary aim of this task is to make you familiar with how
to use a cryptographic library.

1.1 Language and environment

The programming language and environment is your choice. The only requirement is that you must
be able to give a demonstration of your program. Basically this means that it is unlikely that you
will have any problems, if you submit an executable (or Java) program for DOS/Windows and that
probably you will need to make your own arrangements otherwise.

1.2 Cryptographic library

For this task you will need to use an external cryptographic library. These cryptographic libraries
have functions for the most common cryptographic tasks, for example using a block cipher.
Currently many programming languages (including Java) have built-in libraries that might provide
the all required functionality for the tasks of the assignment. Alternatively, there are external
libraries that you might wish (e.g. OpenSSL) to use. There are other libraries out there, and, if you
find one that suits your needs, feel free to use it!

1.3 Requirements

The solution will be a program, and you will need to give a demonstration of how it works. You
will need to hand in the **source code** and an ***executable (or interpretable) code***, either by email, on
memory stick, as a pointer to a place where it can be downloaded etc. You must also provide ***a
short instruction*** how to run the program. The time when you will give a demonstration can be
arranged individually (by email); depending from circumstances there might be several “official
times”, which will be announced later.

## 2 The task

Your task is to create a program that encrypts and decrypts a given text using a **symmetric block
cipher** of your choice: AES, 3DES, IDEA etc. (DES is also acceptable, but not recommended) and
encrypts/decrypts using the following chaining modes:

```
a) **CBC** chaining mode;
b) either **CFB or OFB** chaining mode (you can chose which one you want).
```
The program should take as input a string of arbitrary length and a key, encrypt (decrypt) the string
using the key and output the result.

Different chaining modes are described in chapter 9 of Applied Cryptography.

For **CBC mode** it is required that the **length of the output must be the same as the length of the
input**. Hence, you must deal with the possibility that the input may not be an even multiple of the
block length, and you must implement a method of some sort to deal with this problem. (However,


you can assume that the length of the input will be at least the size of one block.) As a consequence,
you should assume that initialization vector is constant for all encryptions (e.g. all bits are zeroes).

For **CFB or OFB mode** you should use a random initialization vector for each encryption. As a
result, your ciphertext will be longer than plaintext; however you still must deal with the possibility
that the input may not be an even multiple of the block length. Also, for **CFB or OFB modes**, in
addition to encryption of the file you should compute **MAC** (Message Authentication Code) using
a suitable and secure scheme of your choice (for this task **CMAC (OMAC)** is probably the simplest
and most obvious candidate) and a ***different key*** from the one you used for encryption. You can
chose to store MAC either as part of the ciphertext, or in a separate file. During decryption you
should also verify the correctness of the stored MAC value.

You can choose the details of the user interface in any way you like. The string to encrypt/decrypt
and the key used should be read from a file, as well as the result of encryption/decryption has to be
saved in file. The result of encrypted/decrypted should be saved in ***binary format***. You can use
flags to switch between encryption/decryption and chaining modes, or you can use different
programs.

You also need to provide tools for generation of random keys (or, if you wish, keys can be derived
from a pass-phrase) and saving them to files. If your cryptographic library supports it, using
***hexadecimal format*** for key files is preferable.

Formally, the requirements are the following:

**- Input:** An arbitrary length string, a key (or keys), (for CFB/OFB decryption) a MAC value (if
stored separately), a choice of chaining mode and a choice of whether to encrypt or decrypt.
**- Output:** An file with encryption/decryption of the string under the specified chaining mode with
the specified key (for CFB/OFB encryption – a file with MAC code, if you chose to store the code
separately), (for CFB/OFB decryption) the information (could be in any format – shown in GUI,
printed on screen, stored in file etc.) whether the MAC value is correct.

Naturally, decrypting an encrypted string should give back the clear text. For this task, you may
use block ciphers from an external library, **but you must implement the chaining (both for
encryption and MAC computation) and the special processing of the last block(s) by yourself.**
In other words, you may only use a function that takes one block as input, performs regular
encryption, and returns the encrypted block. You don’t have to implement error handling of any
kind – you can assume that the format of the input is correct, and it is perfectly all-right to crash on
invalid input!

Good luck!


