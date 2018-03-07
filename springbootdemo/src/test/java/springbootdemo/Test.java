package springbootdemo;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import org.springframework.context.annotation.ComponentScan;




import springfox.documentation.swagger2.annotations.EnableSwagger2;



@ComponentScan(basePackages="springbootdemo.com")
@EntityScan(basePackages={"springbootdemo.com.Entity"})  
@SpringBootApplication
@EnableSwagger2  
public class Test {
	
	 public static void main(String[] args) {  

		 SpringApplication.run(Test.class, args);  
	 }


}
