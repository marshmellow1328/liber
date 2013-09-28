package com.marshmallowswisdom.liber.services;

import java.util.List;

public class ContentFieldValueForm {
	
	private int id;
	private String name;
	private String value;
	
	public int getId() {
		return id;
	}
	
	public void setId( final int id ) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setType( String type ) {
		//do nothing
	}
	
	public void setOptions( final List<Object> options ) {
		//do nothing
	}
	
	public void setPaths( final List<String> paths ) {
		//do nothing
	}
	
	public String getValue() {
		return value;
	}
	
	public void setValue(String value) {
		this.value = value;
	}
	
}
