package com.marshmallowswisdom.liber.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
	@OneToMany( mappedBy = "field", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<FieldValue> values;
	
	@SuppressWarnings("unused")
	private Field() { /* for JPA */ }
	
	public Field( final String name, final String type ) {
		this.name = name;
		this.type = type;
		values = new HashSet<FieldValue>();
	}
	
	public Field( final String name, final String type, final Set<FieldValue> values ) {
		this.name = name;
		this.type = type;
		this.values = values;
		for( FieldValue value : values ) {
			value.setField( this );
		}
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
	
	public Set<FieldValue> getValues() {
		return values;
	}

}
