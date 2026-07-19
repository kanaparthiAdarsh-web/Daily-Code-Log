import java.util.Scanner;

class Second_program {
    public static void main(String[] args) {
        System.out.println("Enter the basic Salary: ");
        Scanner sc = new Scanner(System.in);
        double bs=sc.nextDouble();
        double da=bs*0.40;
        double hr=bs*0.20;
        double gs=bs+hr+da;
        System.out.println("Your Gross Salary is: "+gs+"%");
        System.out.printf("Your Gross Salary is: %.2f%%",gs);
    }
}