package com.marshmallowswisdom.liber.services;

public class TagForm {
	
	private String name;
	private Integer parent;
	private String path;
	
	public TagForm() {
		name = "";
	}
	
	public String getName() {
		return name;
	}
	
	public void setName( final String name) {
		this.name = name;
	}
	
	public Integer getParent() {
		return parent;
	}
	
	public void setParent( final Integer parent) {
		this.parent = parent;
	}
	
	public String getPath() {
		return path;
	}
	
	public void setPath( final String path ) {
		this.path = path;
	}
	
}
