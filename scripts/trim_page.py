#!/usr/bin/python

import sys

# this script trims all 

pageFile       = open(sys.argv[1], 'r')
newPageContent = ''
state          = 0

pageFile.seek(780)

while True:
    pageChar = pageFile.read(1)
    
    if not pageChar:
        break

    if state == 0 and pageChar == '<':
        state = 1
    elif state == 0 and pageChar != '<':
        pass
    elif state == 1 and pageChar == 'p':
        state = 2
    elif state == 1 and pageChar != 'p':
        state = 0
    elif state == 2 and pageChar == ' ':
        state = 3
    elif state == 2 and pageChar != ' ':
        state = 0
    elif state == 3 and pageChar == 'c':
        state = 4
    elif state == 3 and pageChar != 'c':
        state = 0
    elif state == 4 and pageChar == 'l':
        state = 5
    elif state == 4 and pageChar != 'l':
        state = 0
    elif state == 5 and pageChar == 'a':
        state = 6
    elif state == 5 and pageChar != 'a':
        state = 0
    elif state == 6 and pageChar == 's':
        state = 7
    elif state == 6 and pageChar != 's':
        state = 0
    elif state == 7 and pageChar == 's':
        state = 8
    elif state == 7 and pageChar != 's':
        state = 0
    elif state == 8 and pageChar == '=':
        state = 9
    elif state == 8 and pageChar != '=':
        state = 0
    elif state == 9 and pageChar == '"':
        state = 10
    elif state == 9 and pageChar != '"':
        state = 0
    elif state == 10 and pageChar == 'b':
        state = 11
    elif state == 10 and pageChar != 'b':
        state = 0       
    elif state == 11 and pageChar == 'a':
        state = 12
    elif state == 11 and pageChar != 'a':
        state = 0
    elif state == 12 and pageChar == 's':
         state = 13
    elif state == 12 and pageChar != 's':
         state = 0
    elif state == 13 and pageChar == '8':
        state = 14
    elif state == 13 and pageChar != '8':
        state = 0
    elif state == 14 and pageChar == '"':
        state = 15
    elif state == 14 and pageChar != '"':
        state = 0
    elif state == 15 and pageChar == '>':
        state = 50
    elif state == 15 and pageChar != '>':
        state = 0
    elif state == 50 and pageChar == '<':
        state = 51
    elif state == 50 and pageChar != '<':
        state = 50
        newPageContent = newPageContent + pageChar
    elif state == 51 and pageChar == '/':
        state = 52
    elif state == 51 and pageChar != '/':
        state = 50
        newPageContent = newPageContent + '<' + pageChar      
    elif state == 52 and pageChar == 'p':
        state = 53
    elif state == 52 and pageChar != 'p':
        state = 50
        newPageContent = newPageContent + '</' + pageChar
    elif state == 53 and pageChar == '>':
        state = 100
    elif state == 53 and pageChar != '>':
        state = 50
        newPageContent = newPageContent + '</p' + pageChar

print newPageContent
