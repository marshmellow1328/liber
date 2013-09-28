package com.marshmallowswisdom.liber.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue( "simple" )
public class SimpleFieldValue extends FieldValue {
	
	/* for JPA */
	private SimpleFieldValue() {
		super( null );
	}
	
	public SimpleFieldValue( final String value ) {
		super( value );
	}

}
