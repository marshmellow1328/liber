class {'nodejs':
	version	=> 'v0.10.26'
}

package {'grunt-cli':
	ensure		=> '0.1.13',
	provider	=> 'npm',
	require		=> Class['nodejs']
}

exec {'npm-install':
	command	=> '/usr/local/node/node-default/bin/npm install',
	cwd		=> '/vagrant/services',
	require	=> Class['nodejs']
}

include '::mongodb::server'
