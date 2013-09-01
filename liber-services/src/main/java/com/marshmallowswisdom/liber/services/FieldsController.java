package com.marshmallowswisdom.liber.services;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.marshmallowswisdom.liber.domain.Field;
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
	public Field createField( @RequestBody final Field field ) {
		final Repository repository = new Repository();
		return repository.saveField( field );
	}

}
