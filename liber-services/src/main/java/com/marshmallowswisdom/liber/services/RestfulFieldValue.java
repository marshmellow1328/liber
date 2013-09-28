package com.marshmallowswisdom.liber.services;

import com.marshmallowswisdom.liber.domain.FieldValue;

public class RestfulFieldValue {
	
	private final FieldValue value;
	
	public RestfulFieldValue( final FieldValue value ) {
		this.value = value;
	}
	
	public int getId() {
		return value.getId();
	}
	
	public String getValue() {
		return value.getValue();
	}

}
