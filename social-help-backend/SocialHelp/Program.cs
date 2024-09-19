using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SocialHelp.Core;
using SocialHelp.Core.Services.Interfaces;
using SocialHelp.Core.Services.Managers;

var builder = WebApplication.CreateBuilder(args);
ConfigureServices(builder);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}


//line 23 to be uncommented
//line 26 - 29 to be removed once deployed

//app.UseHttpsRedirection();

app.UseCors(
options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
);

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();


void ConfigureServices(WebApplicationBuilder builder)
{
    ConfigurationManager configuration = builder.Configuration;
    IServiceCollection services = builder.Services;

    // Add services to the container
    services.Configure<SocialHelpDBConfig>(builder.Configuration);

    // Adding the Dependencies
    services.AddControllers();
    services.AddSingleton<IDbClient, DbClient>();
    services.AddTransient<IUserServices, UserServices>();
    services.AddTransient<ICompanyService, CompanyService>();
    services.AddTransient<IActivityServices, ActivityServices>();
    services.AddTransient<IRoleRequestServices, RoleRequestServices>();
    services.AddTransient<IActivityTagServices, ActivityTagServices>();
    services.AddTransient<IBuddyServices, BuddyServices>();


    // Configure JWT Authentication
    services.AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(x =>
    {
        var jwtKey = configuration["JWTKey"];
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
    services.AddControllers();


    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    services.AddSwaggerGen(options =>
    {
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "JWT Authorization header using the Bearer scheme."
        });
        options.AddSecurityRequirement(new OpenApiSecurityRequirement {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
            }
        });
    });
    services.AddEndpointsApiExplorer();
}

