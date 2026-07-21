import java.util.Scanner;

class KM {
    public static void main(String[] adarsh) {
        System.out.println("Enter the KM: ");
        Scanner sc =new Scanner(System.in);
        double km = sc.nextDouble();
        System.out.println("meter is "+km*1000+"\nCentimeters is "+km*100*1000);
    }
}