package com.marshmallowswisdom.liber.domain;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="content_type")
public class Type {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column
	private String name;
	@ManyToMany
	@JoinTable( name = "content_type_field", 
				joinColumns = {@JoinColumn( name = "content_type_id", 
											referencedColumnName = "id" )}, 
				inverseJoinColumns = {@JoinColumn( name = "field_id", 
													referencedColumnName = "id" )} )
	private Set<Field> fields;
	
	@SuppressWarnings("unused")
	private Type() { /* for JPA */ }
	
	public Type( final String name ) {
		this.name = name;
	}
	
	public Type( final int id, final String name, final Set<Field> fields ) {
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
	
	public Set<Field> getFields() {
		return fields;
	}

}
