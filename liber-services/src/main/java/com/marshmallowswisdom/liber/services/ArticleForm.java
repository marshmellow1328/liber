package com.marshmallowswisdom.liber.services;

import java.util.List;

import org.springframework.util.AutoPopulatingList;

public class ArticleForm {
	
	private String type;
	private String name;
	private String content;
	private List<ContentFieldValueForm> fields;
	private List<String> tags;
	
	public ArticleForm() {
		type = "";
		name = "";
		content = "";
		tags = new AutoPopulatingList<String>( String.class );
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

	public String getContent() {
		return content;
	}

	public void setContent( final String content ) {
		this.content = content;
	}
	
	public List<ContentFieldValueForm> getFields() {
		return fields;
	}
	
	public void setFields( final List<ContentFieldValueForm> fields ) {
		this.fields = fields;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags( final List<String> tags ) {
		this.tags = tags;
	}

}
