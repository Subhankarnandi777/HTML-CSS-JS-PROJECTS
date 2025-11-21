import random
'''
1 = stone 
-1 = paper
0 = scissor 
'''
computer = random.choice([-1,0,1])
youstr= input("enter your choise:")
youDict = {"s":1, "p": -1, "sc": 0}
reverseDict = {1: "stone" , -1:"papar", 0:"scissor"}
you = youDict[youstr]
print(f" you choose:{reverseDict[you]} \n Computer choose:{reverseDict[computer]}")

if (computer == you):
    print("Its a draw")
else:
    if(computer == -1 and you == 1):
        print("You lose")
    elif(computer == -1 and you == 0):
        print("You Win!")
    elif(computer == 1 and you == 0):
        print("You lose")
    elif(computer == 1 and you == -1):
        print("You Win!")
    elif(computer == 0 and you == -1):
        print("You lose")
    elif(computer == 0 and you == 1):
        print("You Win!")
    else:
        print("someting went wrong")
