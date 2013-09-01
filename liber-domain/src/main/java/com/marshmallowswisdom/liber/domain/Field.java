package com.marshmallowswisdom.liber.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="field")
public class Field {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column
	private String name;
	@Column
	private String type;
	
	@SuppressWarnings("unused")
	private Field() { /* for JPA */ }
	
	public Field( final String name, final String type ) {
		this.name = name;
	}
	
	public int getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public String getType() {
		return type;
	}

}
