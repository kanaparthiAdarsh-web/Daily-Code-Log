#include <stdio.h>
#include <conio.h>

int sumoffactorial(int n);
void main()
{
	int num,perfect_Number;
	clrscr();
	printf("Enter a number: ");
	scanf("%d", &num);
	perfect_Number=sumoffactorial(num);
	if(perfect_Number==num)
		printf("%d is a Perfect Number", num);
	else
		printf("%d is not a Perfect Number", num);
	getch();
}
int sumoffactorial(int n)
{
	int i,sum = 0;
	for(i=1;i<n;i++)
		if(n%i==0)
			sum+=i;
	return sum;
}