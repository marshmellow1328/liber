package com.marshmallowswisdom.liber.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.marshmallowswisdom.liber.domain.Article;
import com.marshmallowswisdom.liber.domain.Tag;
import com.marshmallowswisdom.liber.persistence.Repository;

@Controller
@RequestMapping("/tags")
public class TagsController {
	
	@RequestMapping( method = RequestMethod.GET )
	@ResponseBody
	public List<RestfulTag> retrieveTags() {
		final Repository repository = new Repository();
		final List<Tag> tags = repository.retrieveTags();
		final List<RestfulTag> restfulTags = new ArrayList<RestfulTag>();
		for( Tag tag : tags ) {
			restfulTags.add( convertTag( tag ) );
		}
		return restfulTags;
	}
	
	@RequestMapping( value = "/{id}", method = RequestMethod.GET )
	@ResponseBody
	public RestfulTag retrieveTag( @PathVariable final int id ) {
		final Repository repository = new Repository();
		final Tag tag = repository.retrieveTag( id );
		return new RestfulTag( tag, tag.getParent(), tag.getChildTags() );
	}
	
	@RequestMapping( method = RequestMethod.POST )
	@ResponseBody
	public RestfulTag createTag( @ModelAttribute final TagForm tag ) {
		final Repository repository = new Repository();
		final Integer parentId = tag.getParent();
		Tag domainTag = new Tag( tag.getName(), repository.retrieveTag( parentId ) );
		domainTag = repository.saveTag( domainTag );
		return convertTag( domainTag );
	}
	
	@RequestMapping( value = "/{tagId}/articles", method = RequestMethod.GET )
	@ResponseBody
	public List<RestfulArticle> getArticles( @PathVariable final int tagId ) {
		final Repository repository = new Repository();
		final List<Article> articles = repository.retrieveArticlesByTag( tagId );
		final List<RestfulArticle> restfulArticles = new ArrayList<RestfulArticle>();
		for( Article article : articles ) {
			final RestfulArticle restfulArticle = new RestfulArticle( article );
			restfulArticles.add( restfulArticle );
		}
		return restfulArticles;
	}
	
	private RestfulTag convertTag( final Tag tag ) {
		final RestfulTag restfulTag = new RestfulTag( tag, null, Collections.<Tag> emptyList() );
		restfulTag.addLink( new Link( "self", "/liber-services/tags/" + tag.getId() ) );
		restfulTag.addLink( new Link( "view", "/liber-web/tags/" + tag.getId() ) );
		return restfulTag;
	}

}
