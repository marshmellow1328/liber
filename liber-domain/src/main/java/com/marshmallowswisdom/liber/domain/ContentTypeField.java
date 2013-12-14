package com.marshmallowswisdom.liber.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="content_type_field")
public class ContentTypeField {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

}
