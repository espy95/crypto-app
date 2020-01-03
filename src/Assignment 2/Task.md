# Applied cryptography – assignment 2, X.509 certificates

## October 31, 2019

## 1 Instructions

Solve the problem described below using tools of your choice. The assignment should be solved
individually. A complete solution will be rewarded with 20 points. A partial solution will be
awarded with less. The primary aim of this task is to make you familiar with how to use an external
cryptographic library.

## 1.1 Language and environment

The programming language and environment is your choice. The only requirement is that you must
be able to give a demonstration of your program. Basically this means that it is unlikely that you
will have any problems, if you submit an executable (or Java) program for DOS/Windows and that
probably you will need to make your own arrangements otherwise.

## 1.2 Cryptographic library

For this task you will need to use an external cryptographic library. These cryptographic libraries
have functions for the most common cryptographic tasks, for example using a block cipher.
Currently many programming languages (including Java) have built-in libraries that might provide
the all required functionality for the tasks of the assignment. Alternatively, there are external
libraries that you might wish (e.g. OpenSSL) to use. There are other libraries out there, and, if you
find one that suits your needs, feel free to use it!

## 1.3 Requirements

The solution will be a program, and you will need to give a demonstration of how it works. You
will need to hand in the ***source code*** and an ***executable (or interpretable) code***, either by email, on
memory stick, as a pointer to a place where it can be downloaded etc. You must also provide ***a
short instruction*** how to run the program. The time when you will give a demonstration can be
arranged individually (by email); depending from circumstances there might be several “official
times”, which will be announced later.


## 2 The task

Your task consists of the following 3 steps:

1. Write a program that creates a valid X.509 standard compliant root (i.e. self-signed) certificate
    on your name and issued by yourself (you can freely choose the values for other “meaningful
    fields”). The certificate should sign your public encryption key of **RSA** algorithm (desirably
    with ***at least 2048 bit*** key) and the certificate itself should be signed using **RSA** and **SHA-2**
    message digest algorithm.
2. Write a program that verifies your certificate (since it is a root certificate, it is sufficient to
    check ***whether certificate issuer and subject are the same and whether a digital signature of
    the issuer matches the subject’s public key)***.
3. Write a program that encrypts and decrypts a message of suitable length using the public RSA
    key from the certificate/private key file that you have created and one of RSA
    encryption/padding schemes specified in PKCS #1 standard.

Some technical requirements:

**-** You can either implement creating of certificate compliant to X.509 format by yourself (by
referring to RFC 5280 standard), or you can use libraries (including script-based), however
each of the steps above should be performed by a single ***non-interactive*** run of the program
(i.e. you can’t just call a program from some library that opens its own dialog and just asks you
to fill in the required certificate fields). In particular, the information about the issuer and the
subject (and other parameters you chose to provide) of the certificate should be read from a
text file (but it is up to you what syntax you use for this file).

**-** The program(s) should allow executing each of the 3 steps separately; also there should be
option to execute separately encryption and decryption parts of step 3.

**-** You program should store both the created certificate and the corresponding private key in files
(and e.g. ***not try to install it*** on computer!) The certificate file must correspond to one of
machine-readable formats (CER, PEM etc.), for private key file you may use either some
standard or your own format.

**-** The verification program should be able read both the certificate and private key from the files
you had created in previous step. The same applies to encryption/decryption program for step
3, which in addition has to be able to read and store encrypted/non-encrypted messages in files.

A complete solution for Step 1 will be awarded 10 points. Complete solutions for Steps 2 and 3
will be awarded 5 points each.

Good luck!


