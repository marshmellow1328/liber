package com.marshmallowswisdom.liber.services;

public class HierarchicalFieldValueForm {
	
	private String value;
	private int parentId;
	
	public String getValue() {
		return value;
	}
	
	public void setValue( final String newValue ) {
		value = newValue;
	}
	
	public int getParentId() {
		return parentId;
	}
	
	public void setParentId( final int newParentId ) {
		parentId = newParentId;
	}

}
