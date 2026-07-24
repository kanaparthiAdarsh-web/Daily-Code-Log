package time_for_java;

class Student{
	String name;
	int age;
	String grade;
	public Student(String studentname,int studentage,String studentgrade) {
		name=studentname;
		age=studentage;
		grade=studentgrade;
	}
}
public class Java3 {

	public static void main(String[] args) {
		Student s1=new Student("Pavani",18,"A+");
		System.out.println("Student Details");
		System.out.println("Name: "+s1.name);
		System.out.println("Age: "+s1.age);
		System.out.println("Grade: "+s1.grade);
		
		

	}

}
