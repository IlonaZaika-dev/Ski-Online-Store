using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser 
                {
                    DisplayName = "Robert",
                    Email = "robert@test.com",
                    UserName = "robert@test.com",
                    Address = new Address
                    {
                        FirstName = "Robert",
                        LastName = "Fowler",
                        Street = "12 The Street",
                        City = "New York",
                        State = "NY",
                        ZipCode = "65439"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}