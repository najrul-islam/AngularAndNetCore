using DataAccess.GenericRepositoryAndUnitOfWork;
using Entity.ViewModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.StaticData;

namespace Service
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskVm>> GetTasks();
        Task<TaskVm> GetTask(string taskId);
        Task<TaskVm> AddTask(DataAccess.Models.Task task);
        Task<Status> EditTask(TaskVm task);
        Task<Status> DeleteTask(string taskId);
    }
    public class TaskService : ITaskService
    {
        private readonly IRepository<DataAccess.Models.Task> _repository;
        private readonly IUnitOfWork _unitOfWork;
        public TaskService(IRepository<DataAccess.Models.Task> repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public async Task<TaskVm> AddTask(DataAccess.Models.Task task)
        {
            try
            {
                task.TaskGuid = Guid.NewGuid().ToString();
                task.IsActive = true;
                task.IsDeleted = false;
                task.CreatedDate = DateTime.UtcNow;
                task.ModifiedDate = DateTime.UtcNow;
                _repository.Add(task);
                if (await _unitOfWork.SaveAsync() > 0)
                {
                    return ConvertToVm(task);
                }
                return null;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<Status> DeleteTask(string taskId)
        {
            try
            {
                DataAccess.Models.Task task = await _repository.FindAsync(x => x.TaskGuid == taskId && x.IsActive == true && x.IsDeleted == false);
                _repository.Delete(task);
                if (await _unitOfWork.SaveAsync() > 0)
                {
                    return new Status
                    {
                        Message = StaticData.TASK_DELETE_SUCCESS,
                        StatusCode = StatusCodes.Status200OK
                    };
                }
                else
                {
                    return new Status
                    {
                        Message = StaticData.ERROR_TYPE_NONE,
                        StatusCode = StatusCodes.Status400BadRequest
                    };
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<Status> EditTask(TaskVm task)
        {
            try
            {
                DataAccess.Models.Task originalTask = await _repository.FindAsync(x => x.TaskGuid == task.TaskGuid && x.IsActive == true && x.IsDeleted == false);
                DataAccess.Models.Task updatedTask = AssignVmDataToEntity(task, originalTask);
                updatedTask.ModifiedDate = DateTime.UtcNow;
                _repository.Update(updatedTask);
                if (await _unitOfWork.SaveAsync() > 0)
                {
                    return new Status
                    {
                        Message = StaticData.TASK_UPDATE_SUCCESS,
                        StatusCode = StatusCodes.Status200OK
                    };
                }
                else
                {
                    return new Status
                    {
                        Message = StaticData.ERROR_TYPE_NONE,
                        StatusCode = StatusCodes.Status400BadRequest
                    };
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<TaskVm> GetTask(string taskId)
        {
            try
            {
                DataAccess.Models.Task task = await _repository.FindAsync(x => x.TaskGuid == taskId && x.IsActive == true && x.IsDeleted == false);
                return ConvertToVm(task);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IEnumerable<TaskVm>> GetTasks()
        {
            try
            {
                IEnumerable<DataAccess.Models.Task> tasks = await _repository.FindAllAsync(x =>x.IsActive == true && x.IsDeleted == false);
                IEnumerable<TaskVm> result = tasks.Select(s => ConvertToVm(s));
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        //helper methods
        private TaskVm ConvertToVm(DataAccess.Models.Task task)
        {
            return new TaskVm
            {
                TaskGuid = task.TaskGuid,
                Title = task.Title,
                Description = task.Description,
                TaskDate = task.TaskDate,
                TaskFromTime = task.TaskFromTime,
                TaskToTime = task.TaskToTime,
                Location = task.Location
            };
        }
        private DataAccess.Models.Task AssignVmDataToEntity(TaskVm task, DataAccess.Models.Task entity)
        {
            entity.Title = task.Title;
            entity.Description = task.Description;
            entity.TaskDate = task.TaskDate;
            entity.TaskFromTime = task.TaskFromTime;
            entity.TaskToTime = task.TaskToTime;
            entity.Location = task.Location;
            return entity;
            
        }
    }
}
