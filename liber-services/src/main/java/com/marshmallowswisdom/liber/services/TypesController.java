package com.marshmallowswisdom.liber.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.marshmallowswisdom.liber.domain.ContentType;
import com.marshmallowswisdom.liber.domain.Field;
import com.marshmallowswisdom.liber.persistence.Repository;

@Controller
@RequestMapping("/types")
public class TypesController {
	
	@RequestMapping( method = RequestMethod.GET )
	@ResponseBody
	public List<RestfulType> retrieveTypes() {
		final Repository repository = new Repository();
		List<ContentType> types = repository.retrieveTypes();
		List<RestfulType> restfulTypes = new ArrayList<RestfulType>();
		for( ContentType type : types ) {
			restfulTypes.add( new RestfulType( type.getId(), 
												type.getName(), 
												Collections.<RestfulField> emptyList() ) );
		}
		return restfulTypes;
	}

	@RequestMapping( value = "/{id}", method = RequestMethod.GET )
	@ResponseBody
	public ContentType retrieveType( @PathVariable final int id ) {
		final Repository repository = new Repository();
		return repository.retrieveType( id );
	}
	
	@RequestMapping( method = RequestMethod.POST )
	@ResponseBody
	public ContentType createType( @RequestBody final TypeForm type ) {
		final Repository repository = new Repository();
		return repository.saveType( new ContentType( type.getName() ) );
	}
	
	@RequestMapping( value = "/{id}", method = RequestMethod.DELETE )
	@ResponseBody
	public String deleteType( @PathVariable final int id ) {
		final Repository repository = new Repository();
		repository.deleteType( id );
		return "success";
	}
	
	@RequestMapping( value = "/{id}", method = RequestMethod.PUT )
	@ResponseBody
	public ContentType updateType( @RequestBody final TypeForm type ) {
		final Repository repository = new Repository();
		final Set<Field> fields = new HashSet<Field>();
		for( FieldForm field : type.getFields() ) {
			fields.add( repository.retrieveField( field.getId() ) );
		}
		return repository.saveType( new ContentType( type.getId(), type.getName(), fields ) );
	}

}
