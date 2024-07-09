package io.reactpro;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ReactProjectSignUpPage {

	public String Name(String name) {
		return name;
	}
	public String Username(String username) {
		return username;
	}
	
	public boolean Password(String password) {
		return password.length()==8;
	}
	
	public  boolean Email(String input) {
		Pattern pattern = Pattern.compile("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$");
		Matcher matcher = pattern.matcher(input);
	return matcher.matches();
	}
	
	public  boolean Contact(String input) {
		Pattern pattern = Pattern.compile("^[0-9]{10}$");
		Matcher matcher = pattern.matcher(input);
	return  matcher.matches();
	}
}
