# prescriptive-backend 

## Stack
Node Express server, Postgres DB for staging, deployed to Heroku!

## Deployment
To Heroku!
Contains 4 million lines preloaded from BindingDB, please see DS-Data for the .dump.

## Intended Usage

###
The normal operation of the server requires only GET requests.

/ligands
GET requests must contain an attached header containing either a `lig_id` (integer) which identifies a ligand on the database, or a `SMILES` ('string'). Matches including that sequence as a substring are returned, up to 10 at a time. Use `page` and `exact` flags on the header to control behavior of the GET.

Optional header flags:
```
{
  lig_id: integer, // also matches against a ligand ID
  exact: boolean, // causes an exact match against the appropriate sequence
  page: integer // returns the next 10 results, defaults to 0.
}
```

/sequences
GET requests must contain an attached header containing either a `seq_id` (integer) which identifies a protein sequence on the database, or a `sequence` ('string'). Matches including that sequence as a substring are returned, up to 10 at a time. Use `page` and `exact` flags on the header to control behavior of the GET.

Optional header flags:
```
{
  lig_id: integer, // also matches against a ligand ID
  exact: boolean, // causes an exact match against the appropriate sequence
  page: integer // returns the next 10 results, defaults to 0.
}
```

### Over The Web Server Interaction
Due to deployment challenges, putting both repositories on the same server is not always an option. For this purpose, web registration is enabled, but heavily restricted because it is assumed that few servers will be interacting with it.

/register is an endpoint that accepts a JSON object containing
```
  snake_joke: 'string',
  name: 'string',
  password: 'string'
```

The `name` must be unique, but the `password` can be anything. It will be hashed. `snake_joke` is checked against a secret that controls accepting new registrations. Left undefined, it prevents new registration. Added, only servers which have somehow otherwise obtained the matching key can register.

/login is an endpoint that accepts a JSON object containing
```
  name: 'string',
  password: 'string'
```
  
Successful login issues a JSON web token.

/predictions endpoint requires mounting this token in the headers. This endpoint aaccepts an `effect_id` which identifies a `lig_id`, `seq_id` pair, and a `bind_chance` float, which updates the appropriate fields on `lig2seq`.
