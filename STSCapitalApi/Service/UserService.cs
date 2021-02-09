using DataAccess.GenericRepositoryAndUnitOfWork;
using DataAccess.Models;
using Entity.ViewModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Utility.PasswordHelper;
using Utility.StaticData;

namespace Service
{
    public interface IUserService
    {
        Task<IEnumerable<UserVm>> GetUsers();
        Task<Status> AddUser(User user);
    }
    public class UserService : IUserService
    {
        private readonly IRepository<User> _repository;
        private readonly IPasswordHasher _hasher;
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IRepository<User> repository, IPasswordHasher hasher, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _hasher = hasher;
            _unitOfWork = unitOfWork;
        }

        public async Task<Status> AddUser(User user)
        {
            try
            {
                Status status = new Status();
                if (await CheckUserExist(user) == false)
                {
                    string hashValue = _hasher.Hash(user.Password);
                    user.PasswordHash = hashValue;
                    user.UserGuid = Guid.NewGuid().ToString();
                    user.CreatedDate = DateTime.UtcNow;
                    user.ModifiedDate = DateTime.UtcNow;
                    user.IsActive = true;
                    user.IsDeleted = false;
                    _repository.Add(user);
                    if (await _unitOfWork.SaveAsync() > 0)
                    {
                        status.Message = StaticData.USER_ADD_SUCCESS;
                        status.StatusCode = StatusCodes.Status200OK;
                        return status;
                    }
                    else
                    {
                        status.Message = StaticData.ERROR_TYPE_NONE;
                        status.StatusCode = StatusCodes.Status400BadRequest;
                        return status;
                    }
                }
                else
                {
                    status.Message = StaticData.USER_EXIST;
                    status.StatusCode = StatusCodes.Status409Conflict;
                    return status;
                }
               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task<bool> CheckUserExist(User user)
        {
            try
            {
                User existinguser = await _repository.FindAsync(x => x.Email == user.Email && x.IsActive == true && x.IsDeleted == false);
                if (existinguser == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<UserVm>> GetUsers()
        {
            try
            {
                var users = await _repository.FindAllAsync(x=>x.IsActive == true && x.IsDeleted == false);
                var result = users.Select(s => new UserVm
                {

                    Email = s.Email,
                    FirstName = s.FirstName,
                    FullName = s.FullName,
                    Image = s.Image,
                    Initials = s.Initials,
                    LastName = s.LastName,
                    UserName = s.UserName,
                    UserGuid = s.UserGuid,
                    Phone = s.Phone

                });
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
