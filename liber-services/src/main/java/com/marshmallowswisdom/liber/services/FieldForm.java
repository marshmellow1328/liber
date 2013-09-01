package com.marshmallowswisdom.liber.services;

public class FieldForm {
	
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
	
	public String getValue() {
		return value;
	}
	
	public void setValue(String value) {
		this.value = value;
	}
	
}
