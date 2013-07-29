package com.marshmallowswisdom.liber.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.marshmallowswisdom.liber.domain.Article;
import com.marshmallowswisdom.liber.domain.ArticleVersion;
import com.marshmallowswisdom.liber.domain.Tag;
import com.marshmallowswisdom.liber.persistence.Repository;

@Controller
@RequestMapping("/articles")
public class ArticlesController {
	
	@RequestMapping( value = "/{id}", method = RequestMethod.GET )
	@ResponseBody
	public RestfulArticle retrieveArticle( @PathVariable final int id ) {
		final Repository repository = new Repository();
		final Article article = repository.retrieveArticle( id );
		return new RestfulArticle( article );
	}
	
	@RequestMapping( method = RequestMethod.POST )
	@ResponseBody
	public RestfulArticle createArticle( @RequestBody final ArticleForm article ) {
		final Repository repository = new Repository();
		final Set<Tag> tags = new HashSet<Tag>();
		for( String path : article.getTags() ) {
			if( path != null && !path.isEmpty() ) {
				tags.add( repository.retrieveTagByPath( path ) );
			}
		}
		Article domainArticle = new Article( article.getName() );
		ArticleVersion version = new ArticleVersion( domainArticle, article.getContent(), tags );
//		domainArticle.setLatestVersion( version );
//		version = repository.saveArticleVersion( version );
//		domainArticle = repository.saveArticle( domainArticle );
		domainArticle = repository.saveNewArticle( domainArticle, version );
		return new RestfulArticle( domainArticle );
	}

}
