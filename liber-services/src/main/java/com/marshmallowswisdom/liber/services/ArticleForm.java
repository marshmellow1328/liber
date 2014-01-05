package com.marshmallowswisdom.liber.services;

import java.util.List;

public class ArticleForm {
	
	private String type;
	private String name;
	private List<ContentFieldValueForm> fields;
	
	public ArticleForm() {
		type = "";
		name = "";
	}
	
	public String getType() {
		return type;
	}
	
	public void setType( final String type ) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName( final String name ) {
		this.name = name;
	}
	
	public List<ContentFieldValueForm> getFields() {
		return fields;
	}
	
	public void setFields( final List<ContentFieldValueForm> fields ) {
		this.fields = fields;
	}

}
