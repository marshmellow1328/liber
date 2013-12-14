package com.marshmallowswisdom.liber.services;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.marshmallowswisdom.liber.domain.ContentType;
import com.marshmallowswisdom.liber.persistence.Repository;

@Controller
@RequestMapping("/types")
public class TypesController {
	
	@RequestMapping( method = RequestMethod.GET )
	@ResponseBody
	public List<ContentType> retrieveTypes() {
		final Repository repository = new Repository();
		return repository.retrieveTypes();
	}
	
	@RequestMapping( method = RequestMethod.POST )
	@ResponseBody
	public ContentType createType( @RequestBody final TypeForm type ) {
		final Repository repository = new Repository();
		return repository.saveType( new ContentType( type.getName() ) );
	}

}
