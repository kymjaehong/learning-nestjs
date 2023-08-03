import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should be 4", () => {
    expect(2 + 2).toEqual(4)
  })

  describe("get_all", () => {

    it("should return an array", () => {
      const result = service.getAll()
      expect(result).toBeInstanceOf(Array)
    })
  })

  describe("get_one", () => {
    it("should find a movie", () => {
      // given
      service.create({
        title: "test movie",
        year: 2000,
        genres: ["test"]
      });
      // when
      const movie = service.getOne(1);
      // then
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw a NotFoundException", () => {
      const test_id = 999
      try {
        service.getOne(test_id)
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual(`Movie with Id: ${test_id} not found.`)
      }
    });
  });

  describe("delete_one", () => {
    it("should delete a movie", () => {
      // given
      service.create({
        title: "test movie",
        year: 2000,
        genres: ["test"]
      });
      const before_delete = service.getAll().length;
      // when
      const movie = service.deleteOne(1);
      // then
      const after_delete = service.getAll().length;
      expect(before_delete).toEqual(1);
      expect(after_delete).toBeLessThan(before_delete);
    });

    it("should throw a NotFoundException", () => {
      const test_id = 999
      try {
        service.deleteOne(test_id)
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual(`Movie with Id: ${test_id} not found.`)
      }
    })
  })

  describe("create", () => {
    it("should create a movie", () => {
      const before_create = service.getAll().length
      service.create({
        title: "test movie",
        year: 2000,
        genres: ["test"]
      })
      const after_create = service.getAll().length

      expect(before_create).toEqual(0)
      expect(after_create).toBeGreaterThan(before_create)
    })
  })

  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title: "test movie",
        year: 2000,
        genres: ["test"]
      })
      service.update(1, {title: "update test"})
      const after_update = service.getOne(1)
      expect(after_update.title).toEqual("update test")
    })

    it("should throw a NotFoundException", () => {
      const test_id = 999
      try {
        service.update(test_id, {title: "update test"})
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual(`Movie with Id: ${test_id} not found.`)
      }
    })
  })
});
