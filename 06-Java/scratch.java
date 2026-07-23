class Scratch {
    public static void main(String[] args) {
        int[] a=new int[] {10,20,30,40,50};
        int sum=0;
        for(int i=0;i<a.length;i++)
            {
                sum=sum+a[i];
            }
        System.out.println("Sum of array elements:"+sum);
        System.out.println("Average of array elements:"+(sum/a.length));
        int lang,small;
        lang=small=a[0];
        for(int i=0;i<a.length;i++)
        {
            if(lang<a[i])
            {
                lang=a[i];
            }
            if(small>a[i])
            {
                small=a[i];
            }
        }
        System.out.println("Largest element:"+lang);
        System.out.println("Smallest element:"+small);

    }
}