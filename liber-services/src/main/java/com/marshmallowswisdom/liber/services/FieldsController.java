package com.marshmallowswisdom.liber.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.marshmallowswisdom.liber.domain.Field;
import com.marshmallowswisdom.liber.domain.FieldValue;
import com.marshmallowswisdom.liber.persistence.Repository;

@Controller
@RequestMapping("/fields")
public class FieldsController {
	
	@RequestMapping( method = RequestMethod.GET )
	@ResponseBody
	public List<Field> retrieveFields() {
		final Repository repository = new Repository();
		return repository.retrieveFields();
	}
	
	@RequestMapping( method = RequestMethod.POST )
	@ResponseBody
	public Field createField( @RequestBody final FieldForm field ) {
		final Repository repository = new Repository();
		Set<FieldValue> values = new HashSet<FieldValue>();
		for( FieldValueForm valueForm : field.getValues() ) {
			values.add( new FieldValue( valueForm.getValue() ) );
		}
		Field domainField = new Field( field.getName(), field.getType(), values );
		return repository.saveField( domainField );
	}

}
