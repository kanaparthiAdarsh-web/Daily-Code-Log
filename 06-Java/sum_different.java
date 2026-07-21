import java.util.Scanner;

class sum_different {
    public static void main(String adarsh[]) {
        System.out.printf("Enter Two numbers: ");
        Scanner sc =new Scanner(System.in);
        int a=sc.nextInt();
        int b=sc.nextInt();
        System.out.printf("The sum is: %d\nThe Different between to number is %d", (a+b),(a<b)?b-a:a-b);
        
    }
}