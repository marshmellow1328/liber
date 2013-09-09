package com.marshmallowswisdom.liber.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.marshmallowswisdom.liber.domain.Field;
import com.marshmallowswisdom.liber.domain.FieldValue;
import com.marshmallowswisdom.liber.domain.HierarchicalFieldValue;
import com.marshmallowswisdom.liber.domain.SimpleFieldValue;
import com.marshmallowswisdom.liber.persistence.Repository;

@Controller
@RequestMapping("/fields")
public class FieldsController {
	
	@RequestMapping( method = RequestMethod.GET )
	@ResponseBody
	public List<RestfulField> retrieveFields() {
		final Repository repository = new Repository();
		final List<RestfulField> fields = new ArrayList<RestfulField>();
		for( Field field : repository.retrieveFields() ) {
			fields.add( new RestfulField( field ) );
		}
		return fields;
	}
	
	@RequestMapping( method = RequestMethod.POST )
	@ResponseBody
	public Field createField( @RequestBody final FieldForm field ) {
		final Repository repository = new Repository();
		Set<FieldValue> values = new HashSet<FieldValue>();
		if( field.getType().equals( "hierarchical" ) ) {
			values.add( new HierarchicalFieldValue( "_root", null ) );
		}
		else if( field.getType().equals( "dropdown" ) ) {
			for( FieldValueForm valueForm : field.getValues() ) {
				values.add( new SimpleFieldValue( valueForm.getValue() ) );
			}
		}
		Field domainField = new Field( field.getName(), field.getType(), values );
		return repository.saveField( domainField );
	}
	
	@RequestMapping( value = "/{fieldId}/values", method = RequestMethod.POST )
	@ResponseBody
	public FieldValue createFieldValue( @RequestBody final HierarchicalFieldValueForm value, 
										@PathVariable final int fieldId ) {
		final Repository repository = new Repository();
		final HierarchicalFieldValue parent = 
				(HierarchicalFieldValue)repository.retrieveFieldValue( value.getParentId() );
		final HierarchicalFieldValue domainValue = 
				new HierarchicalFieldValue( value.getValue(), parent );
		domainValue.setField( repository.retrieveField( fieldId ) );
		return repository.saveFieldValue( domainValue );
	}
	
	@RequestMapping( value = "/{fieldId}/values/{id}", method = RequestMethod.GET )
	@ResponseBody
	public RestfulHierarchicalFieldValue retrieveFieldValue( @PathVariable final int id ) {
		final Repository repository = new Repository();
		final HierarchicalFieldValue value = 
				(HierarchicalFieldValue)repository.retrieveFieldValue( id );
		return new RestfulHierarchicalFieldValue( value, value.getParent(), value.getChildren() );
	}
	
	@ExceptionHandler( Exception.class )
	public void handleException( final Exception error ) {
		Logger.getLogger( getClass() ).error( "Error processing request", error );
	}

}
