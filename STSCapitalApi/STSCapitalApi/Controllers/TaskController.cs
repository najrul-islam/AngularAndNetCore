using Entity.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Utility.StaticData;

namespace STSCapitalApi.Controllers
{
    [ApiController]
    [Route(StaticData.API_CONTROLLER_ROUTE), Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: api/Task
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _taskService.GetTasks();
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        // GET api/Task/5
        [HttpGet(StaticData.ID)]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var result = await _taskService.GetTask(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        // POST: api/Task
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]DataAccess.Models.Task task)
        {
            try
            {
                var result = await _taskService.AddTask(task);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // PUT api/Task
        [HttpPut]
        public async Task<IActionResult> Edit([FromBody]TaskVm task)
        {
            try
            {
                var result = await _taskService.EditTask(task);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        // DELETE api/Task
        [HttpDelete(StaticData.ID)]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var result = await _taskService.DeleteTask(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
