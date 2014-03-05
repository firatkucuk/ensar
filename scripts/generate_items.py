#!/usr/bin/python

allFile = open('all.txt', 'r')
state   = 0

while True:
    allChar = allFile.read(1)
    
    if not allChar:
        break

    if state == 0 and allChar == '<':
        state = 1
    elif state == 0 and allChar != '<':
        pass

    elif state == 1 and pageChar == 'a':
        state = 2
    elif state == 1 and pageChar != 'a':
        state = 0

    elif state == 2 and pageChar == ' ':
        state = 3
    elif state == 2 and pageChar != ' ':
        state = 0

    elif state == 3 and pageChar == 'n':
        state = 4
    elif state == 3 and pageChar != 'n':
        state = 0

    elif state == 4 and pageChar == 'a':
        state = 5
    elif state == 4 and pageChar != 'a':
        state = 0

    elif state == 5 and pageChar == 'm':
        state = 6
    elif state == 5 and pageChar != 'm':
        state = 0

    elif state == 6 and pageChar == 'e':
        state = 7
    elif state == 6 and pageChar != 'e':
        state = 0

    elif state == 7 and pageChar == '=':
        state = 8
    elif state == 7 and pageChar != '=':
        state = 0

    elif state == 8 and pageChar == '"':
        state = 9
    elif state == 8 and pageChar != '"':
        state = 0

    elif state == 9 and (pageChar == '1' or pageChar == '2' or pageChar == '3'):
        state = 10
    elif state == 9 and !(pageChar == '1' or pageChar == '2' or pageChar == '3'):
        state = 0

    elif state == 10 and pageChar == '"':
        state = 11
    elif state == 10 and pageChar != '"':
        state = 0

    elif state == 11 and pageChar == '>':
        state = 12
    elif state == 11 and pageChar != '>':
        state = 0

    elif state == 12 and pageChar == ' ':
        state = 13
    elif state == 12 and pageChar != ' ':
        state = 0

    elif state == 13 and pageChar == '<':
        state = 50
    elif state == 13 and pageChar != '<':
        state = 50
        newPageContent = newPageContent + pageChar
        
    elif state == 14 and pageChar == '/':
        state = 51
    elif state == 14 and pageChar != '/':
        state = 50
        newPageContent = newPageContent + '<' + pageChar

    elif state == 15 and pageChar == 'a':
        state = 52
    elif state == 15 and pageChar != 'a':
        state = 50
        newPageContent = newPageContent + '</' + pageChar

    elif state == 16 and pageChar == '>':
        state = 53
    elif state == 16 and pageChar != '>':
        state = 50
        newPageContent = newPageContent + '</a' + pageChar





