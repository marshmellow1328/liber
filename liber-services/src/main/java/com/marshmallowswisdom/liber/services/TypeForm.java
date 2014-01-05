package com.marshmallowswisdom.liber.services;

import java.util.List;

import org.springframework.util.AutoPopulatingList;

public class TypeForm {
	
	private int id;
	private String name;
	private List<FieldForm> fields;
	
	public TypeForm() {
		fields = new AutoPopulatingList<FieldForm>( FieldForm.class );
	}
	
	public int getId() {
		return id;
	}
	
	public void setId( final int id ) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName( final String name ) {
		this.name = name;
	}
	
	public List<FieldForm> getFields() {
		return fields;
	}
	
	public void setFields( final List<FieldForm> fields ) {
		this.fields = fields;
	}

}
