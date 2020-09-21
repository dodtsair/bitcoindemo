# Assess AWS Amplify
Hello Asish I hope you had a good weekend.  Please review my assessment of
 the AWS Amplify technology as you requested during our last chat.    

## Bitcoin Watch Demo
I took the guides for AWS Amplify and used it to build a simple application
.  To tease out the capabilities of the platform.  This simply
 allows you to build a list of bitcoin addresses and later see the balances
  of those addresses.  

You can see the demo here: https://dev.d2nv7oakby1rs1.amplifyapp.com

Because of the power of the framework I am able have as basic framework of an
 application in less then one weekends work.
Sure, if I was actually going to write a SaaS application to watch bitcoin
 balances it would take more than a weekend.  But I can already demonstrate
  progress to my stakeholders.   
  
## Framework 
The Framework itself pulls together a slew of AWS technologies and makes
 those quickly available for development of SaaS applications with little
  need to understand how those technologies are deployed and configured.  It
   is a great framework to accelerate your SaaS application development.  

Some of those core technologies include
1. AppSync
1. Lambda
1. DynamoDB
1. Cognito 
1. Cloudformation
1. Codebuild/Codepipeline

In order to asses the value of the framework, you need to assess both its
 ability to easily bring technology together, also the key technologies
  it brings.  

### AppSync
AppSync is a powerful managed GraphQL framework.  That means you get the
 power of GraphQL without building it from scratch.  GraphQL itself allows
  you to bring in multiple sources and fetch in one query.  Have a dashboard
  , with multiple independent components, GraphQL can load all the required
   data in one request.  It also allows the schema to be defined by the
    request, which means that the backend can evolve much more quickly
     without disrupting its clients.  
### Lambda
Technology has advanced quickly, where just a short time ago  running
 a web application meant a bare metal box sitting underneath your desk.  Now
  layers have been pealed off and managed by external parties.  Lambda now
   manages the process and its existence for you. How many are needed to
    handle load, restarting them when they fail, monitoring their health
    .  Since this has all been handled you can focus on writing the
     function itself.  But you are still stuck with how Lambda chooses to do
      this, so no concurrency one process one task, cold starts when Lambda
       blocks the request while starting up a new instance.  Very stateless
       , so if you are working with a database that needs sustained
        connections, don't do it directly through lambda.  
### DynamoDB
I have not looked into DynamoDB that much.  It delivers on the NoSQL promise
 of true horizontal scalability.  The schema is not ridged, allowing you to
  store and process loosely structured information.  Where it gives you
   freedom you must provide your own discipline.  It doesn't make sense to
    have five different data models.  But you can, and will if you do not
     enforce your own discipline when writing objects.  Like many NoSQL
      databases the less ridge the data, the more limited the query language
      .  For example, it has no "group by" clause.
### Cognito
Short and simple don't write Identity and Access Management yourself, do you
 really want to meet and discuss the best way to encrypt passwords, how to do
  encryption at rest etc. etc.  This has already been solved.  
### Cloudformation
Goes hand in hand with CICD.  You want to be able to make a change, and see
 it in production as quickly as you can and as confidently as you can
 . Cloudformation takes a look at your desired state, the current, state and
  makes only the delta changes needed.  All done in an automated way so that
   your engineers do not need to be sitting in a meeting walking through a
    production deployment hoping you got all the steps right.
### Codebuild/Codepipeline
Gives you the confidence that you can take your changes to production when
 Cloudformation makes it easy to do so.  What I particularly like about
  Amplify is its ability to do one branch per environment.  This is a CICD
   process I most prefer, because while you can still do the classic, dev
   , stage, prod pipeline.  You can, at need, create new environments and throw
    them away.  It also ensures that your different environments are
     completely separate, because the integration point is the source code
      repository.  Want to move something from dev, to stage.  Merge one
       branch with the other and let the pipeline take over.  
       
       
## Preparing and Mitigating

Now when you have a framework like Amplify that "does it for you" it really
 needs to do everything.  Typically, with these frameworks you run into one
  of two problems.  We'll talk about each and then talk about mitigation
   plans.  
  
  ### One, the framework doesn't do it.  
  This forces you to
   bring in a use case with its toolset, which maybe the same toolset you
    would have to use if you didn't use Amplify.  Amplify supports
     integrating with other external resources, so the connection can be
      there, but the development of those resources would have to be outside
       Amplify.
   
   Mitigation plans
   
   Spend more time on due diligence with the framework, better to know
    what it is missing before you need it.  Wouldn't we all like all the
     time in the world for due diligence.  At some point you need to jump
      in.  Start with a
     low
     priority project, use the framework on that project.  Use that project to
      clear the way for
      other projects, make the determination that it can meet their needs, or
       it cannot.    
       
  ### Two, the framework does it, wrong.  
  It doesn't need to be wrong per se
  , just inconsistent with your goals.  For example Lambda isn't the best at
   low latency APIs, but can be improved with "Provisioned Concurrency".  If you
    want that with Amplify please wait: https://github.com/aws-amplify
    /amplify-cli/issues/4865.  It is not really that Amplify does it wrong
    , it just does not do it right.
    
  Mitigation plans
  See the mitigations for one, but with the additional mitigation, be
   prepared to spend
   resources on the
   framework itself.  Your SaaS application needs Provisioned Concurrenct
   , resolve issue 4865 for the community and then make use of it. Keep an
    eye on your road map.  If an incoming feature needs something that is
     outside the box of the framework, plan the time needed to make it happen.  
    
  ### Three, specifically for AWS Amplify, its young
  The framework itself is only about three years old.  That means the
   documentation is still getting built out. It also means the framework is
    going to have bugs.  It may do things, that are needed for your SaaS
     application, but its not in the documents.  It will not always have good
      error
      checking resulting and strange to comprehend errors.  For example in
       their example https://docs.amplify.aws/guides/api-graphql/lambda
       -resolvers/q/platform/js instead of typing 
       ```
       echo(msg: String): String @function(name: "functionName-${env}")
       ```
       ```
       echo(msg: String): String @function(name: "functionName-${evn}")
       ```
       It is a subtle mistake, but the failure, the cloudformation fails to
        update. Wouldn't it be better of it just said 'evn' does not exists
        .  It will get there over time, but its not there today.
     
  Mitigation plans
  See the mitigations for two, additionally be prepared to become a framework
   expert.  If the framework breaks with a bug, you'll need to triage the
    framework itself.  Be prepared to fix the bug in the framework and hand
     it back to the authors as a pull request.
     
  Also consider having on deck the skills and abilities to use the
   technologies without the framework.  The framework can and wil accelerate
    your
    development
   , but avoid being fully blocked when it can't accelerate you.