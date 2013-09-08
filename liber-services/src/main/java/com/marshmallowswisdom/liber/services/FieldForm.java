package com.marshmallowswisdom.liber.services;

import java.util.List;

import org.springframework.util.AutoPopulatingList;

public class FieldForm {
	
	private String name;
	private String type;
	private List<FieldValueForm> values;
	
	public FieldForm() {
		values = new AutoPopulatingList<FieldValueForm>( FieldValueForm.class );
	}
	
	public String getName() {
		return name;
	}
	
	public void setName( final String name ) {
		this.name = name;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType( final String type ) {
		this.type = type;
	}
	
	public List<FieldValueForm> getValues() {
		return values;
	}
	
	public void setFields( final List<FieldValueForm> values ) {
		this.values = values;
	}

}
