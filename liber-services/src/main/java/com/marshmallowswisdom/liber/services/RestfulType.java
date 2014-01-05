package com.marshmallowswisdom.liber.services;

import java.util.List;

public class RestfulType {
	
	private int id;
	private String name;
	private List<RestfulField> fields;
	
	public RestfulType( final int id, final String name, final List<RestfulField> fields ) {
		this.id = id;
		this.name = name;
		this.fields = fields;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public List<RestfulField> getFields() {
		return fields;
	}

}
