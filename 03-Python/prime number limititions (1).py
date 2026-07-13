fn=int(input("Enter the First Limit: "))
ln=int(input("Enter the last Limit: "))
count=0
while(1):
    pm=fn
    i=2
    while(i<=pm-1):
        if(pm%i==0):
            count+=1
        i+=1
    if(count==0 and fn!=1):
        print(pm)
    count=0
    fn+=1
    if(fn==ln):   
        break
