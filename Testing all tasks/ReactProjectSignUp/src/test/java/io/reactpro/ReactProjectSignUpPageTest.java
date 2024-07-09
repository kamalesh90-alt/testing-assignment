package io.reactpro;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Scanner;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.TestReporter;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ReactProjectSignUpPageTest {
	
	@Test
	@Order(1)
	void Nametest() {
		ReactProjectSignUpPage r=new ReactProjectSignUpPage();
		String expected="Nirmal Raj";
		String expResult=r.Name(expected);
		Scanner sc=new Scanner(System.in);
		String actual=sc.nextLine().trim();
		
		assertAll(
				"",
				()->assertEquals(actual,expResult)
				//()->assertEquals("",expResult,"Name must not be empty")
				);
		
		
	}

	@Test
	@Order(4)
	void Usernametest() {
		ReactProjectSignUpPage r=new ReactProjectSignUpPage();
		String expected="user1";
		String expResult=r.Username(expected);
		Scanner sc=new Scanner(System.in);
		String actual=sc.nextLine().trim();
		
		assertAll(
				"",
				()->assertEquals(actual,expResult)
				//()->assertEquals("",expResult,"User name must not be empty")
				);
		
		
	}
	
	@Test
	@Order(5)
	void Passwordtest() {
		ReactProjectSignUpPage r=new ReactProjectSignUpPage();
		String expected="user@2k1";
		String expResult=r.Username(expected);
		Scanner sc=new Scanner(System.in);
		String actual=sc.nextLine().trim();
		
		assertAll(
				"",
				()->assertEquals(actual,expResult)
				//()->assertEquals("",expResult,"Password must not be empty"),
				//()->assertEquals(actual,expected,"Password must be of 8 characters")
				);
		
		
	}
	
	@Test
	@Order(3)
	void EmailTest() {
		ReactProjectSignUpPage r=new ReactProjectSignUpPage();
		String expected = "nirmal@gmail.com";
		System.out.println("enter email");
		Scanner sc=new Scanner(System.in);
		String actual = sc.nextLine();	
		if(actual.trim()=="") {
			fail("email cannot be empty..");
		}
		assertTrue(r.Email(actual),"Not Valid email");
		assertEquals(expected, actual,"email is not same");

 
	}
	
	@Test
	@Order(2)
	void ContactTest() {
		ReactProjectSignUpPage r=new ReactProjectSignUpPage();
		String expected = "7550064411";
		System.out.println("enter contact");
		Scanner sc=new Scanner(System.in);
		String actual = sc.nextLine();	
		if(actual.trim()=="") {
			fail("contact cannot be empty..");
		}
		assertTrue(r.Contact(actual),"contact length must be length 10");
		assertEquals(expected, actual,"contact is not same");

		
		
	}
	
	ReactProjectSignUpPage t;
	TestInfo testInfo;
	TestReporter testReporter;
	@Test
	@Tag("Nametest")
	@Tag("ContactTest")
	@Tag("EmailTest")
	@Tag("Usernametest")
	@Tag("Passwordtest")
	void init(TestInfo testInfo,TestReporter testReporter) {
		t = new ReactProjectSignUpPage();
		this.testInfo = testInfo;
		this.testReporter = testReporter;
		testReporter.publishEntry("tested all "+testInfo.getTags());
	}
	
	}
	


