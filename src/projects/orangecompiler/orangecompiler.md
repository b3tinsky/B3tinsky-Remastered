---
title: "Orange Compiler"
date: "2022-11-22"
tags: ["Python"]
cover: "./Orange.jpg"
description: "Simple compiler & programming language"
---
[Github Repository](https://github.com/betorendon/---Orange-Compiler)

The Orange Compiler™ is a simple compiler used alongside the Orange Language™ to teach the inner workings of a compiler in a simple and enjoyable manner. It has a small hint of data analysis as an added bonus.

### 📝 Checkpoints
Checkpoints are given by our professor, although they can change during the semester and they are more like 'symbolic' checkpoints to help us complete the project. These checkpoints represent the core components of the compiler. It is strongly recommended to follow the order of the checkpoints since they follow the class syllabus and the compiler is built in a secuential manner (cannot skip to a further component without finishing previous ones).

__✅ Checkpoint \#0__
- ~~Project proposal~~
- ~~Token list~~
- ~~Syntax diagrams~~

__✅ Checkpoint \#1: Lexical and Syntactical Analysis__

__✅ Checkpoint \#2: Basic variable semantics__
- ~~Procedure directory~~
- ~~Variable table~~

__✅ Checkpoint \#3: Expression semantics__
- ~~Semantic cube~~
- ~~Code generation for arithmetic expressions and secuential statutes~~
- ~~Assignment~~
- ~~Read~~
- ~~Write~~
- Etc.

__✅ Checkpoint \#4: Code generation for conditional statutes__
- ~~Decisions~~
- ~~Cycles~~
    - ~~WHILE~~
    - ~~DO WHILE~~
    - ~~FOR~~

__✅ Checkpoint \#5: Code generation for functions__
- Function definition
    - ~~VOID~~
    - ~~TYPED~~
- ~~Function call~~

__✅ Checkpoint \#6: Memory map for virtual machine__
- ~~Memory management~~
- ~~Execution of arithmetic expressions~~
- ~~Secuential statutes~~

__✅ Checkpoint \#7: Code generation for arrays and structured types__
- ~~Execution of conditional statutes~~

__✅ Checkpoint \#8: First version of documentation__
- ~~For a specific section~~
    - ~~Code generation~~
    - ~~Virtual machine~~

### 🗒️ Log

__📆 August 23 🕓 23:13__

Created repository. Started planning and design. Started checkpoint #0.

---

__📆 August 26 🕓 17:22__

Made list with tokens.

---

__📆 August 29 🕓 19:03__

Finished checkpoint #0 (proposal, token list and syntax diagrams). Things can still be changed or added, depending on teacher's feedback (more special functions, more structured types, etc).

---

__📆 August 30 🕓 20:22__

Designing and documenting test for the Orange Compiler. 

---

__📆 September 01 🕓 15:29__

Minor changes to syntax diagrams and proposal document. Added first input files to testing folder.

---

__📆 September 02 🕓 23:16__

Finished first version of parser. Instead of staying with PLY, I gave SLY a go. I felt that it has a little bit better syntax, and in the worst case scenario, I don't think its that complicated to change it to PLY again. I finished the parser based on the LittleDuck homework, and my proposal's syntax diagrams. As I was making the parser, I noticed several areas where problems my arise (reduction conflicts, redundance, etc.), but this version only serves as a backup while I keep working on fixing said issues. Also, I still don't know why Git/Github is not signing my commits.

---

__📆 September 05 🕓 17:10__

Solved a reduce/reduce conflict with the block contents. I have a slight suspicion that the same issue might happen again with other rules, but the fix is very simple.
For the block contents I had the rules:

blockcontents -> statute | statute blockcontents | empty

And all I did was remove the 'statute' rule. It fixes the conflict because now if there is only one statute in the block, it can exit through the empty rule, instead of having to decide.

I think this will happen again because I have a vague memory of doing something similar in other rules, but I believe those problems will become easily visible if I keep making more tests to poke at the grammar rules.

---

__September 05 🕓 19:35__

Watched recorded class (September 20) where the teacher talks about semantics. This recording was needed to begin writing basic variable semantics and the development of a procedure directory and a variable table.

---

__September 06 🕓 16:48__

Watched recorded class (September 23) where the teacher talks about semantics and focuses more on development and refinement of the function directory/variable table. Started development of function directory and variable table components. 

---

__September 09 🕓 23:38__

Main program now accepts arguments to run/test the scanner, the parser, or both. Finished an implementation for function directory and variable table. When the parser enters a new function, I added a rule BEFORE the current rule ends where the current context is switched. This means that for a rule like < MAIN LPAREN RPAREN block > I added the rule < MAIN changecontext LPAREN RPAREN block > so that the context changes for everything inside the main block and not everything after it. The implementation works by creating an object for the function directory and an object for the variable table. When the parser passes through a new context, the variable table is cleared. All the variables declared in said context are added to the variable table, and then the whole variable table is added to the current function/context in the function directory. I also added some tags to identify important parts in the project. I still to make sure everything is working correctly with the function directory and the variable tables, but for now its good progress. In later commits, I want to add more testing input files. I also want to implement a testing framework (pytest or unittest) or maybe develop my own testing, but that will depend on which I find more convenient. I should also refine my testing document (add more testing points, design tests, document more, etc.).
 
---

__September 13 🕓 20:34__

Deleted token COLON because I noticed I didn't actually use it in any rule. I added it because I've used it in other programming languages, so I assumed I would use in my own, but after careful inspection, I noticed that by the way some statutes are organized, the COLON is never used. Struggled with Python's local module importing, so I decided to create a GENERAL testing file with multiple classes that represent each input file and have it at the root folder so that I don't have problems with imports. At this point I will add more tests before I continue with more complex topics like scope and memory allocation. I also renamed and restructured the files and folders. Also, the introduction of INPUT 0, this input file will be constantly changed, so it will not have tests written for it. Input 0 is for development and to see real time changes. 

---

__September 14 🕓 20:23__

Before I jump into creating the semantic cube and other semantic functions, I want to test that the parser is working (or at least most of it) so I don't run into bigger problems later. I noticed that in a < RETURN_BLOCK >, if the user writes something like: 

return a + b;

It loops forever, but if the user writes:

return (a + b);

It works fine. I fixed it by returning an < exp > instead of a < factor >. This could later bring problems, but I really doubt it. Just in case im stating it in this commit.

---

__September 15 🕓 20:10__

Changed the way in which errors are detected. Instead of a having a property in the scanner and parser, I created a new object that tracks the global status (by this I mean that for each input the status resets). This works well for testing and for running it in main, since every time a new input is provided, a new status checker is given as well. Also, this new object allows me to track errors in a more specific way, since now semantic errors can be provided specifically from different points of the compiler, and this will be very useful when making new tests because I can test if the semantic error came from a variable declaration, type mismatch, etc.

---

__September 16 🕓 00:34__

VarTable now checks for global variables before declaration. This was made possible by passing the current FuncDir to the addVar() method in the VarTable class, which also passes it to the checkVar() method in the same class. This ensures that before adding a new variable, it looks for the variable name in the current context, but also in the global scope.

---

__September 20 🕓 17:23__


__Refactored testing__

The old system was comparing emojis that report status. There is a STATUS object that keeps track of the program's status. When an error is expected in any part of the code (maybe in the parser, lexer, etc.), the property had to be manually changed to indicate later that an error occured (the property changed indicated the type of error that happened).

``` 
# OrangeStatus() Object

self.lexStatus      = '✅'
self.syntaxStatus   = '✅'
self.semanticStatus = '✅'
```

And the tests looked like:
```
# test_GENERAL.py

def test_LEX(self):
    assert self.status.lexStatus == '✅'

def test_SYNTAX(self):
    assert self.status.syntaxStatus == '✅'

def test_SEMANTICS(self):
    assert self.status.semanticStatus == '❌'
```

The new system is creating custom error clases based on __Exception__:
``` 
# status.py

class lexicalError(Exception):
    pass

class syntacticalError(Exception):
    pass

class semanticError(Exception):
    pass
```
Python allows to make these custom errors empty and pass a message when the error is raised, giving more flexibility when reporting why the error happened
``` 
# scanner.py

# Error handling rule
def error(self, t):
    self.index += 1
    raise lexicalError("❌ Illegal character '%s'" % t.value[0])

```
And now in the testing file, we only have to expect an exception type:
``` 
# test_GENERAL.py

class TestInput02:
    def test_exception_raised(self):
        with pytest.raises(lexicalError):
            # Initialize a different compiler with the needed file
            status, lexer, parser = initializeCompiler('input_02.txt')
```

__Parser Bugs__
- Reorganized grammars to make the file feel cleaner.
- Refactored variable declarations. Instead of four rules considering if there are global variables/functions, now there is only one which includes global variable declaration and functions regardless, but now global variable declaration and function declaration include an empty rule in case they are not called.
- Every block now has a variable declaration at the beginning. This allows for easier structure and variable scopes.
- Now statutes don't have variable declarations. This prevents local variable nesting (like in for i -> for j -> for k)
- First error rule defined. A specific rule was created to detect when a variable wants to identify as a reserved word. It goes fo < var >, and the token pattern it looks for is an unpacked tuple with all the reserved words in scanner.py. Other specific errors will be made in this way.

__Scanner__
- Added a tuple with reserved words

__Variable Table__

- I rolled back to previous variable checking, since I realized I don't need to check for global variables when DECLARING. So I left a bit of the code as a comment because I will need it when the variable called in the local scope doesn't exist, but it does in the global scope.

__Orange Testing.md__
- Tests added

__Inputs__
- Added input_08.txt
- Added input_09.txt
- Added input_10.txt
- Added input_11.txt

---

__September 21 🕓 10:14__

- Watched the recording of class 4 (Sep27). In this class the teacher talked more about semantics, precedence in arithmetic operations, type matching and the "semantic cube".
- Watched the recording of class 5 (Sep30). In this class the teacher talked about syntax flow, polish vectors, quadruples and intermediate code generation.
- Created first version of semantic cube

---

__September 21 🕓 22:29__

- Watched the recording of class 6 (Oct04). In this class the teacher talked more about quadruple generation.
- Refactored variable declaration rules in the parser and fixed some bugs.
- Started quadruple generator class
- Started some functions in the function directory that will aid the quadruple generatorw 

---

__September 24 🕓 22:19__

- Variables are now looked up in the current scope and the global scope when trying to be used. There are still some details to fix/add, like instead of leaving it as a function checkVar() for the OrangeFunctionDirectory, the checking function will be added to the quadruple generator. This would mean that when generating a quadruple for the variable found, the QuadMachine will look for said variable in the FunctionDirectory.
- Input 12 added
- Input 13 added
- Input 14 added
- Input 15 added
- Input 16 added
- Some tests (4 & 6) needed small corrections. The way they were written only tested for syntax and lex, so now that we actually care about undeclared variables, they didn't work. They still test the same thing they were intended to test, but I had to add a variable declaration to make the Orange Code work.
- If main, global or any function doesn't have variable declaration, they will still be added to the function directory with an empty table (for consistency and ease of search).

---

__September 25 🕓 21:37__

- Quadruple Machine now generates quadruples for arithmetic operations (+ * - /). It first uses the Orange Function Directory's checkVar function when adding operands. Then when an operator is added to the operator stack, it pops two operands and an operator and validates with the semantic cube if the operation is valid, and if not, a semantic error is raised. If its valid, a quadruple is generated and added to the quadruple array.
- Temporary variables are stored with strings (T1, T2, ...). This should change when I learn about implementing memory.
- No tests added in this run, since some core things to quadruple generation are yet to be added. This means that if I added the tests, I would have to refactor them later.
- Constant variable handling is still pending. I added starter code, but I don't know if thats the way to do it. Maybe in a later class recording the teacher will explain how to do it.

---

__September 27 🕓 17:01__

- Refactored parser's arithmetic expressions. I noticed that the way the grammar was written was wrong, since even though it works for precedence, it doesn't for order of operations (it was designed for right association). Fixed it for relational and logical as well.
- Fixed parenthesis usage. Before, the parenthesis were basically ignored. Now a 'fake floor' is created every time a parenthesis is observed, and its removed whenever the parenthesis ends. 
- Added input_17
- Added a basic test for quadruple generation, to see if correct order, precedence, associativity and generation are achieved.

---

__September 27 🕓 17:19__

- Added input_18
- Added another test similar to test_17 just to keep check of associativity, order of operations, parenthesis and quadruple generation, but with a different input 

---

__September 27 🕓 20:03__

- Modified some tests. Some tests broke because with quadruple generation, some things that still don't exist are verified, hence errors are raised
- Added boolean type
- Added quadruple generation for assignment
- Added error raising for 'type mismatch' in the quadruple generation function

---

__September 28 🕓 14:52__

- Quadruple generation for print statements (write).
- Changed regular expression in the scanner for constant strings. This was because it used to match anything, any amount of times inside two quotation marks, causing an error to identify ALL of the parameters in a print as one.

---

__September 28 🕓 16:18__

- Quadruple generation for inputs (read). 
- Quadruple generation for constant variables (int, float, bool, string)

---

__September 30 🕓 16:03__

- Quadruple generation for conditional statements. This includes individual IF statements, IF statements with an ELSE statement, and nested conditional statements.
- Testing for conditional quadruple generation. This includes three tests (lonely IF, IF with an ELSE, nested IFs).
- Refactored <BLOCK>. This was because ANY block could have variable declaration, and this included conditionals, loops, etc. That caused trouble because every block tried to create a new function with the current context, causing a semantic error for 'Function already declared'. All I did was make another type of block that included variable declaration, and changed the rules that actually needed it (main block, global, functions). And everything else remained with a normal block (without being able to declare variables).
- Quadruple machine now tracks quadruple number for later reference. Also, a new stack was added to keep track of unfilled jump positions.
- Added input_20
- Added input_21
- Added input_22

---

__October 02 🕓 17:41__

- Watched recorded class for October 11. The teacher talked about code generation for WHILE and DO WHILE loops.
- Quadruple generation for a WHILE loop. A this point the jumps work, but I feel the code could be better (in a more readable/understandable way). All tests pass, but I want to refactor a bit the 'fillJumps()' function and create more tests (nested while loops, while loops with if statements, loops & conditionals, etc.)
- Added input_23

---

__October 02 🕓 18:18__

- Refactored fillJumps() function and jump filling functionality.

---

__October 02 🕓 23:26__

- Added DO WHILE loops. I wasn't planning on adding a DO WHILE, but while watching the recording of class 7, the teacher added an example for a DO WHILE that included nested WHILE loops and conditionals, and that seemed to me like the perfect example to test everything, so I just decided to give it a shot now that I'm at it.
- Watched recorded class for October 14. The teacher talked about code generation for FOR loops
- Added input_24

---

__October 04 🕓 18:24__

- Added FOR loops. 
- Added '++' to semantic cube. It only works for integers, and its only used in FOR LOOPS. This could be refactored, but for now it made it easy for me incrementing the control variable in a FOR loop and saving its value to itself instead of a temporary variable.
- Added some custom mismatch errors in quadruple machine
- Minor bug fix in openjumpslot that confused the p[-7] position looking for a <DO> token. Since a DO WHILE loop and a FOR LOOP both use the 'do' keyword, and oddly enough in the same position.
- Added input_25
- Added input_26
- Added input_27

---

__October 06 🕓 00:29__

- Watched class recording of October 21. The teacher talked about memory management, virtual memory allocation for functions and quadruple generation for function definition.
- Watched class recording of November 01. The teacher talked about memory management, virtual memory allocation for functions and quadruple generation for function definition (with examples).
- Function directory's directory now stores a functions "address" (at what quadruple the function starts), another table for parameters, a string that represents it's signature, and a structure to keep track of size needed (it tracks amount of variable scopes and types)
- Variable checking in the function directory now takes into account checking parameters too
- Adding parameters now works and also updates the functions signature (only when declared)
- Refactored scanner by "eliminating" reserved words, and merging them into the ID token. Now everything is read as a token, but if said ID matches a reserved word, its type is changed to that reserved word. This prevents the regular expression from matching prefixes (ex. can't have a variable named 'doppler' because it starts with 'do').
- Added a varType to VarTable that keeps track of a variable type for a variable declaration line.
- Refactored parser rules for function and variable definition
- Added many mid point instructions in parser (for quadruple generation, type tracking, etc.)
- Restructured several rules (broke recursion into a single variable rule for easier data extraction)
- Added quadruples for function calls and definition (ERA, GOSUB, PARAM, ENDFUNC)
- Fixed/updated a couple of tests, but I still have to update almost half (because previously tests didn't have the 'params' table, the signature, quadruple number, etc.)

---

__October 07 🕓 14:44__

- Added some actions in between grammar rules for function calling (things like checking the function signature is the same as the function calling it,- checking that the function being called exists, etc.)
- Fixed tests
- Added input_28

---

__October 07 🕓 15:17__

- Watched class recording for November 04. In this class the teacher explained more in depth memory management and gave some tips about how we could design a structure for memory and a virtual machine. The teacher also explained how to store in memory structured data like arrays and matrices.

---

__October 18 🕓 23:08__

- Refactored everything to work with a memory address instead of a variable name
- Memory management
- Added constant table to store constants
- Refactored tests
- Executed tests by hand to confirm everything works (some bugs were found and fixed). Did not execute test 28 yet.

---

__November 01 🕓 16:09__

- Refactored tests
- Separated tests into their own file to avoid problems with a virtual machine execution
- Memory addresses reset after context switch
- OBJ file is generated after the parser finishes and is read and executed by the virtual machine
- RETURN quadruple added
- VirtualMachine developed.
    - Instructions are added as individual functions that are called through a switch (to speed things up)
    - An instruction pointer counter is added and updated as the instructions are read and executed
    - A "breadcrumb" list is added to keep track of instruction numbers to go back when calling a function
    - The function directory and the constant table are brought back to reference them throughout execution

---

__November 08 🕓 20:52__

- Fixed recursion
- Fixed multiple function calls overwriting the return value
- Added an extra quadruple to store a function return value
- Fixed tests to accomodate new quadruple for return values

### Reference

__Official Documentation__

[SLY Documentation](https://sly.readthedocs.io/en/latest/)

[Pytest Documentation](https://docs.pytest.org)

[VS Code Settings Sync](https://code.visualstudio.com/docs/editor/settings-sync)


__Tools__

[Regex 101](https://regex101.com/)


__Blogs__

[Beginner's Book - Python Constructors:  Default & Parameterized](https://beginnersbook.com/2018/03/python-constructors-default-and-parameterized/)

[Refactoring Guru - Singleton Design Pattern](https://refactoring.guru/design-patterns/singleton/python/example)

[Finxter Blog - How to call a parents class method](https://blog.finxter.com/how-to-call-a-parents-class-method-in-python/)

[Datagy.io - Check if dictionary is empty](https://datagy.io/python-check-if-dictionary-empty/)

[GeeksForGeeks - Ternary Operator in Python](https://www.geeksforgeeks.org/ternary-operator-in-python/)

[W3Schools - Python Raise an Exception](https://www.w3schools.com/python/gloss_python_raise.asp)

[Note.nkmk.me - Python unpack values](https://note.nkmk.me/en/python-argument-expand/)

[Splunk Tool - Python evenly space output data with varying string lengths](https://splunktool.com/python-evenly-space-output-data-with-varying-string-lengths)

[El Libro de Python - Switch en Python](https://ellibrodepython.com/switch-python)

[Towards Data Science - Do not use python pickle unless you know all these facts](https://towardsdatascience.com/do-not-use-python-pickle-unless-you-know-all-these-facts-d9e8695b7d43)

[Codigo Piton - Como hacer switch case en python](https://www.codigopiton.com/como-hacer-switch-case-en-python/)

__StackOverflow__

[Method arguments in Python](https://stackoverflow.com/questions/5169257/method-arguments-in-python)

[How do I convert a tuple of tuples to a one-dimensional list using list comprehension?](https://stackoverflow.com/questions/3204245/)

[How do I flatten deeply nested tuples?](https://stackoverflow.com/questions/55496318/how-do-i-flatten-deeply-nested-tuples)

[Import a file from a subdirectory](https://stackoverflow.com/questions/1260792/import-a-file-from-a-subdirectory)

[How to compare type of an object](https://stackoverflow.com/questions/707674/how-to-compare-type-of-an-object-in-python)

[Matching special characters and letters in regex](https://stackoverflow.com/questions/13946651/matching-special-characters-and-letters-in-regex)


### Tags
__TODO__:    Tasks to be done

__HACK__:    Neat ideas to solve problems or cool ideas

__FIXME__:   It works, but not always (could break or not tested)

__BUG__:     It doesn't work

__WARNING__: Could potentially have problems

__DOC__:     Documentation pending for this section