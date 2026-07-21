import java.util.Scanner;

class Third_program{
    public static void main(String[] arge){
        System.out.println("Enter the distance between two cities: ");
        Scanner input;
        input = new Scanner(System.in);
        int distance=input.nextInt();
        int m=distance*1000;
        int cm=m*100;
        System.out.println("Distance between two cities is: "+distance);
        System.out.printf("In m= %d\n In cm=%d\n",m,cm);
        System.out.print("In m="+m+"\n In cm="+cm);
    }
}