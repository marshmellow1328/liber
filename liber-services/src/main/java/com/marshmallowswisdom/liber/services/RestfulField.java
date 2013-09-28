package com.marshmallowswisdom.liber.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.marshmallowswisdom.liber.domain.Field;
import com.marshmallowswisdom.liber.domain.FieldValue;
import com.marshmallowswisdom.liber.domain.HierarchicalFieldValue;

public class RestfulField {
	
	private final Field field;
	
	public RestfulField( final Field field ) {
		this.field = field;
	}
	
	public int getId() {
		return field.getId();
	}
	
	public String getName() {
		return field.getName();
	}
	
	public String getType() {
		return field.getType();
	}
	
	public List<RestfulFieldValue> getValues() {
		List<RestfulFieldValue> values = new ArrayList<RestfulFieldValue>();
		if( field.getType().equals( "hierarchical" ) ) {
			for( FieldValue value : field.getValues() ) {
				final HierarchicalFieldValue hierarchicalValue = (HierarchicalFieldValue)value;
				values.add( new RestfulHierarchicalFieldValue( hierarchicalValue, 
											hierarchicalValue.getParent(), 
											Collections.<HierarchicalFieldValue> emptyList() ) );
			}
		}
		else {
			for( FieldValue value : field.getValues() ) {
				values.add( new RestfulFieldValue( value ) );
			}
		}
		return values;
	}

}
